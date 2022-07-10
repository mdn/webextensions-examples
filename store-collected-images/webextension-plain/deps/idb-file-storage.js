(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("idb-file-storage", ["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.IDBFiles = mod.exports;
  }
})(this, function (exports) {
  "use strict";

  /**
   * @typedef {Object} IDBPromisedFileHandle.Metadata
   * @property {number} size
   *   The size of the file in bytes.
   * @property {Date} last Modified
   *   The time and date of the last change to the file.
   */

  /**
   * @typedef {Object} IDBFileStorage.ListFilteringOptions
   * @property {string} startsWith
   *   A string to be checked with `fileNameString.startsWith(...)`.
   * @property {string} endsWith
   *   A string to be checked with  `fileNameString.endsWith(...)`.
   * @property {string} includes
   *   A string to be checked with `fileNameString.includes(...)`.
   * @property {function} filterFn
   *   A function to be used to check the file name (`filterFn(fileNameString)`).
   */

  /**
   * Wraps a DOMRequest into a promise, optionally transforming the result using the onsuccess
   * callback.
   *
   * @param {IDBRequest|DOMRequest} req
   *   The DOMRequest instance to wrap in a Promise.
   * @param {function}  [onsuccess]
   *   An optional onsuccess callback which can transform the result before resolving it.
   *
   * @returns {Promise}
   *   The promise which wraps the request result, rejected if the request.onerror has been
   *   called.
   */

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.waitForDOMRequest = waitForDOMRequest;
  exports.getFileStorage = getFileStorage;
  function waitForDOMRequest(req, onsuccess) {
    return new Promise((resolve, reject) => {
      req.onsuccess = onsuccess ? () => resolve(onsuccess(req.result)) : () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  /**
   * Wraps an IDBMutableFile's FileHandle with a nicer Promise-based API.
   *
   * Instances of this class are created from the
   * {@link IDBPromisedMutableFile.open} method.
   */
  class IDBPromisedFileHandle {
    /**
     * @private private helper method used internally.
     */
    constructor({ file, lockedFile }) {
      // All the following properties are private and it should not be needed
      // while using the API.

      /** @private */
      this.file = file;
      /** @private */
      this.lockedFile = lockedFile;
      /** @private */
      this.writeQueue = Promise.resolve();
      /** @private */
      this.closed = undefined;
      /** @private */
      this.aborted = undefined;
    }

    /**
     * @private private helper method used internally.
     */
    ensureLocked({ invalidMode } = {}) {
      if (this.closed) {
        throw new Error("FileHandle has been closed");
      }

      if (this.aborted) {
        throw new Error("FileHandle has been aborted");
      }

      if (!this.lockedFile) {
        throw new Error("Invalid FileHandled");
      }

      if (invalidMode && this.lockedFile.mode === invalidMode) {
        throw new Error(`FileHandle should not be opened as '${this.lockedFile.mode}'`);
      }
      if (!this.lockedFile.active) {
        // Automatically relock the file with the last open mode
        this.file.reopenFileHandle(this);
      }
    }

    // Promise-based MutableFile API

    /**
     * Provide access to the mode that has been used to open the {@link IDBPromisedMutableFile}.
     *
     * @type {"readonly"|"readwrite"|"writeonly"}
     */
    get mode() {
      return this.lockedFile.mode;
    }

    /**
     * A boolean property that is true if the lock is still active.
     *
     * @type {boolean}
     */
    get active() {
      return this.lockedFile ? this.lockedFile.active : false;
    }

    /**
     * Close the locked file (and wait for any written data to be flushed if needed).
     *
     * @returns {Promise}
     *   A promise which is resolved when the close request has been completed
     */
    async close() {
      if (!this.lockedFile) {
        throw new Error("FileHandle is not open");
      }

      // Wait the queued write to complete.
      await this.writeQueue;

      // Wait for flush request to complete if needed.
      if (this.lockedFile.active && this.lockedFile.mode !== "readonly") {
        await waitForDOMRequest(this.lockedFile.flush());
      }

      this.closed = true;
      this.lockedFile = null;
      this.writeQueue = Promise.resolve();
    }

    /**
     * Abort any pending data request and set the instance as aborted.
     *
     * @returns {Promise}
     *   A promise which is resolved when the abort request has been completed
     */
    async abort() {
      if (this.lockedFile.active) {
        // NOTE: in the docs abort is reported to return a DOMRequest, but it doesn't seem
        // to be the case. (https://developer.mozilla.org/en-US/docs/Web/API/LockedFile/abort)
        this.lockedFile.abort();
      }

      this.aborted = true;
      this.lockedFile = null;
      this.writeQueue = Promise.resolve();
    }

    /**
     * Get the file metadata (take a look to {@link IDBPromisedFileHandle.Metadata} for more info).
     *
     * @returns {Promise<{size: number, lastModified: Date}>}
     *   A promise which is resolved when the request has been completed
     */
    async getMetadata() {
      this.ensureLocked();
      return waitForDOMRequest(this.lockedFile.getMetadata());
    }

    /**
     * Read a given amount of data from the file as Text (optionally starting from the specified
     * location).
     *
     * @param {number} size
     *   The amount of data to read.
     * @param {number} [location]
     *   The location where the request should start to read the data.
     *
     * @returns {Promise<string>}
     *   A promise which resolves to the data read, when the request has been completed.
     */
    async readAsText(size, location) {
      this.ensureLocked({ invalidMode: "writeonly" });
      if (typeof location === "number") {
        this.lockedFile.location = location;
      }
      return waitForDOMRequest(this.lockedFile.readAsText(size));
    }

    /**
     * Read a given amount of data from the file as an ArrayBufer (optionally starting from the specified
     * location).
     *
     * @param {number} size
     *   The amount of data to read.
     * @param {number} [location]
     *   The location where the request should start to read the data.
     *
     * @returns {Promise<ArrayBuffer>}
     *   A promise which resolves to the data read, when the request has been completed.
     */
    async readAsArrayBuffer(size, location) {
      this.ensureLocked({ invalidMode: "writeonly" });
      if (typeof location === "number") {
        this.lockedFile.location = location;
      }
      return waitForDOMRequest(this.lockedFile.readAsArrayBuffer(size));
    }

    /**
     * Truncate the file (optionally at a specified location).
     *
     * @param {number} [location=0]
     *   The location where the file should be truncated.
     *
     * @returns {Promise<ArrayBuffer>}
     *   A promise which is resolved once the request has been completed.
     */
    async truncate(location = 0) {
      this.ensureLocked({ invalidMode: "readonly" });
      return waitForDOMRequest(this.lockedFile.truncate(location));
    }

    /**
     * Append the passed data to the end of the file.
     *
     * @param {string|ArrayBuffer} data
     *   The data to append to the end of the file.
     *
     * @returns {Promise}
     *   A promise which is resolved once the request has been completed.
     */
    async append(data) {
      this.ensureLocked({ invalidMode: "readonly" });
      return waitForDOMRequest(this.lockedFile.append(data));
    }

    /**
     * Write data into the file (optionally starting from a defined location in the file).
     *
     * @param {string|ArrayBuffer} data
     *   The data to write into the file.
     * @param {number} location
     *   The location where the data should be written.
     *
     * @returns {Promise<number>}
     *   A promise which is resolved to the location where the written data ends.
     */
    async write(data, location) {
      this.ensureLocked({ invalidMode: "readonly" });
      if (typeof location === "number") {
        this.lockedFile.location = location;
      }
      return waitForDOMRequest(this.lockedFile.write(data),
      // Resolves to the new location.
      () => {
        return this.lockedFile.location;
      });
    }

    /**
     * Queue data to be written into the file (optionally starting from a defined location in the file).
     *
     * @param {string|ArrayBuffer} data
     *   The data to write into the file.
     * @param {number} location
     *   The location where the data should be written (when not specified the end of the previous
     *   queued write is used).
     *
     * @returns {Promise<number>}
     *   A promise which is resolved once the request has been completed with the location where the
     *   file was after the data has been writted.
     */
    queuedWrite(data, location) {
      const nextWriteRequest = async lastLocation => {
        this.ensureLocked({ invalidMode: "readonly" });

        if (typeof location === "number") {
          return this.write(data, location);
        }
        return this.write(data, lastLocation);
      };

      this.writeQueue = this.writeQueue.then(nextWriteRequest);
      return this.writeQueue;
    }

    /**
     * Wait that any queued data has been written.
     *
     * @returns {Promise<number>}
     *   A promise which is resolved once the request has been completed with the location where the
     *   file was after the data has been writted.
     */
    async waitForQueuedWrites() {
      await this.writeQueue;
    }
  }

  exports.IDBPromisedFileHandle = IDBPromisedFileHandle;
  /**
   * Wraps an IDBMutableFile with a nicer Promise-based API.
   *
   * Instances of this class are created from the
   * {@link IDBFileStorage.createMutableFile} method.
   */
  class IDBPromisedMutableFile {
    /**
     * @private private helper method used internally.
     */
    constructor({ filesStorage, idb, fileName, fileType, mutableFile }) {
      // All the following properties are private and it should not be needed
      // while using the API.

      /** @private */
      this.filesStorage = filesStorage;
      /** @private */
      this.idb = idb;
      /** @private */
      this.fileName = fileName;
      /** @private */
      this.fileType = fileType;
      /** @private */
      this.mutableFile = mutableFile;
    }

    /**
     * @private private helper method used internally.
     */
    reopenFileHandle(fileHandle) {
      fileHandle.lockedFile = this.mutableFile.open(fileHandle.mode);
    }

    // API methods.

    /**
     * Open a mutable file for reading/writing data.
     *
     * @param {"readonly"|"readwrite"|"writeonly"} mode
     *   The mode of the created IDBPromisedFileHandle instance.
     *
     * @returns {IDBPromisedFileHandle}
     *   The created IDBPromisedFileHandle instance.
     */
    open(mode) {
      if (this.lockedFile) {
        throw new Error("MutableFile cannot be opened twice");
      }
      const lockedFile = this.mutableFile.open(mode);

      return new IDBPromisedFileHandle({ file: this, lockedFile });
    }

    /**
     * Get a {@link File} instance of this mutable file.
     *
     * @returns {Promise<File>}
     *   A promise resolved to the File instance.
     *
     * To read the actual content of the mutable file as a File object,
     * it is often better to use {@link IDBPromisedMutableFile.saveAsFileSnapshot}
     * to save a persistent snapshot of the file in the IndexedDB store,
     * or reading it directly using the {@link IDBPromisedFileHandle} instance
     * returned by the {@link IDBPromisedMutableFile.open} method.
     *
     * The reason is that to be able to read the content of the returned file
     * a lockfile have be keep the file open, e.d. as in the following example.
     *
     * @example
     *     ...
     *     let waitSnapshotStored;
     *     await mutableFile.runFileRequestGenerator(function* (lockedFile) {
     *       const file = yield lockedFile.mutableFile.getFile();
     *       // read the file content or turn it into a persistent object of its own
     *       // (e.g. by saving it back into IndexedDB as its snapshot in form of a File object,
     *       // or converted into a data url, a string or an array buffer)
     *
     *       waitSnapshotStored = tmpFiles.put("${filename}/last_snapshot", file);
     *     }
     *
     *     await waitSnapshotStored;
     *     let fileSnapshot = await tmpFiles.get("${filename}/last_snapshot");
     *     ...
     *     // now you can use fileSnapshot even if the mutableFile lock is not active anymore.
     */
    getFile() {
      return waitForDOMRequest(this.mutableFile.getFile());
    }

    /**
     * Persist the content of the mutable file into the files storage
     * as a File, using the specified snapshot name and return the persisted File instance.
     *
     * @returns {Promise<File>}
     *   A promise resolved to the File instance.
     *
     * @example
     *
     *      const file = await mutableFile.persistAsFileSnapshot(`${filename}/last_snapshot`);
     *      const blobURL = URL.createObjectURL(file);
     *      ...
     *      // The blob URL is still valid even if the mutableFile is not active anymore.
     */
    async persistAsFileSnapshot(snapshotName) {
      if (snapshotName === this.fileName) {
        throw new Error("Snapshot name and the file name should be different");
      }

      const idb = await this.filesStorage.initializedDB();
      await this.runFileRequestGenerator(function* () {
        const file = yield this.mutableFile.getFile();
        const objectStore = this.filesStorage.getObjectStoreTransaction({ idb, mode: "readwrite" });

        yield objectStore.put(file, snapshotName);
      }.bind(this));

      return this.filesStorage.get(snapshotName);
    }

    /**
     * Persist the this mutable file into its related IDBFileStorage.
     *
     * @returns {Promise}
     *   A promise resolved on the mutable file has been persisted into IndexedDB.
     */
    persist() {
      return this.filesStorage.put(this.fileName, this);
    }

    /**
     * Run a generator function which can run a sequence of FileRequests
     * without the lockfile to become inactive.
     *
     * This method should be rarely needed, mostly to optimize a sequence of
     * file operations without the file to be closed and automatically re-opened
     * between two file requests.
     *
     * @param {function* (lockedFile) {...}} generatorFunction
     * @param {"readonly"|"readwrite"|"writeonly"} mode
     *
     * @example
     *   (async function () {
     *      const tmpFiles = await IDBFiles.getFileStorage({name: "tmpFiles"});
     *      const mutableFile = await tmpFiles.createMutableFile("test-mutable-file.txt");
     *
     *      let allFileData;
     *
     *      function* fileOperations(lockedFile) {
     *        yield lockedFile.write("some data");
     *        yield lockedFile.write("more data");
     *        const metadata = yield lockedFile.getMetadata();
     *
     *        lockedFile.location = 0;
     *        allFileData = yield lockedFile.readAsText(metadata.size);
     *      }
     *
     *      await mutableFile.runFileRequestGenerator(fileOperations, "readwrite");
     *
     *      console.log("File Data", allFileData);
     *   })();
     */
    async runFileRequestGenerator(generatorFunction, mode) {
      if (generatorFunction.constructor.name !== "GeneratorFunction") {
        throw new Error("runGenerator parameter should be a generator function");
      }

      await new Promise((resolve, reject) => {
        const lockedFile = this.mutableFile.open(mode || "readwrite");
        const fileRequestsIter = generatorFunction(lockedFile);

        const processFileRequestIter = prevRequestResult => {
          const nextFileRequest = fileRequestsIter.next(prevRequestResult);
          if (nextFileRequest.done) {
            resolve();
            return;
          } else if (!(nextFileRequest.value instanceof window.DOMRequest || nextFileRequest.value instanceof window.IDBRequest)) {
            const error = new Error("FileRequestGenerator should only yield DOMRequest instances");
            fileRequestsIter.throw(error);
            reject(error);
            return;
          }

          const request = nextFileRequest.value;
          if (request.onsuccess || request.onerror) {
            const error = new Error("DOMRequest onsuccess/onerror callbacks are already set");
            fileRequestsIter.throw(error);
            reject(error);
          } else {
            request.onsuccess = () => processFileRequestIter(request.result);
            request.onerror = () => reject(request.error);
          }
        };

        processFileRequestIter();
      });
    }
  }

  exports.IDBPromisedMutableFile = IDBPromisedMutableFile;
  /**
   * Provides a Promise-based API to store files into an IndexedDB.
   *
   * Instances of this class are created using the exported
   * {@link getFileStorage} function.
   */
  class IDBFileStorage {
    /**
     * @private private helper method used internally.
     */
    constructor({ name, persistent } = {}) {
      // All the following properties are private and it should not be needed
      // while using the API.

      /** @private */
      this.name = name;
      /** @private */
      this.persistent = persistent;
      /** @private */
      this.indexedDBName = `IDBFilesStorage-DB-${this.name}`;
      /** @private */
      this.objectStorageName = "IDBFilesObjectStorage";
      /** @private */
      this.initializedPromise = undefined;

      // TODO: evalutate schema migration between library versions?
      /** @private */
      this.version = 1.0;
    }

    /**
     * @private private helper method used internally.
     */
    initializedDB() {
      if (this.initializedPromise) {
        return this.initializedPromise;
      }

      this.initializedPromise = (async () => {
        if (window.IDBMutableFile && this.persistent) {
          this.version = { version: this.version, storage: "persistent" };
        }
        const dbReq = indexedDB.open(this.indexedDBName, this.version);

        dbReq.onupgradeneeded = () => {
          const db = dbReq.result;
          if (!db.objectStoreNames.contains(this.objectStorageName)) {
            db.createObjectStore(this.objectStorageName);
          }
        };

        return waitForDOMRequest(dbReq);
      })();

      return this.initializedPromise;
    }

    /**
     * @private private helper method used internally.
     */
    getObjectStoreTransaction({ idb, mode } = {}) {
      const transaction = idb.transaction([this.objectStorageName], mode);
      return transaction.objectStore(this.objectStorageName);
    }

    /**
     * Create a new IDBPromisedMutableFile instance (where the IDBMutableFile is supported)
     *
     * @param {string} fileName
     *   The fileName associated to the new IDBPromisedMutableFile instance.
     * @param {string} [fileType="text"]
     *   The mime type associated to the file.
     *
     * @returns {IDBPromisedMutableFile}
     *   The newly created {@link IDBPromisedMutableFile} instance.
     */
    async createMutableFile(fileName, fileType = "text") {
      if (!window.IDBMutableFile) {
        throw new Error("This environment does not support IDBMutableFile");
      }
      const idb = await this.initializedDB();
      const mutableFile = await waitForDOMRequest(idb.createMutableFile(fileName, fileType));
      return new IDBPromisedMutableFile({
        filesStorage: this, idb, fileName, fileType, mutableFile
      });
    }

    /**
     * Put a file object into the IDBFileStorage, it overwrites an existent file saved with the
     * fileName if any.
     *
     * @param {string} fileName
     *   The key associated to the file in the IDBFileStorage.
     * @param {Blob|File|IDBPromisedMutableFile|IDBMutableFile} file
     *   The file to be persisted.
     *
     * @returns {Promise}
     *   A promise resolved when the request has been completed.
     */
    async put(fileName, file) {
      if (!fileName || typeof fileName !== "string") {
        throw new Error("fileName parameter is mandatory");
      }

      if (!(file instanceof File) && !(file instanceof Blob) && !(window.IDBMutableFile && file instanceof window.IDBMutableFile) && !(file instanceof IDBPromisedMutableFile)) {
        throw new Error(`Unable to persist ${fileName}. Unknown file type.`);
      }

      if (file instanceof IDBPromisedMutableFile) {
        file = file.mutableFile;
      }

      const idb = await this.initializedDB();
      const objectStore = this.getObjectStoreTransaction({ idb, mode: "readwrite" });
      return waitForDOMRequest(objectStore.put(file, fileName));
    }

    /**
     * Remove a file object from the IDBFileStorage.
     *
     * @param {string} fileName
     *   The fileName (the associated IndexedDB key) to remove from the IDBFileStorage.
     *
     * @returns {Promise}
     *   A promise resolved when the request has been completed.
     */
    async remove(fileName) {
      if (!fileName) {
        throw new Error("fileName parameter is mandatory");
      }

      const idb = await this.initializedDB();
      const objectStore = this.getObjectStoreTransaction({ idb, mode: "readwrite" });
      return waitForDOMRequest(objectStore.delete(fileName));
    }

    /**
     * List the names of the files stored in the IDBFileStorage.
     *
     * (If any filtering options has been specified, only the file names that match
     * all the filters are included in the result).
     *
     * @param {IDBFileStorage.ListFilteringOptions} options
     *   The optional filters to apply while listing the stored file names.
     *
     * @returns {Promise<string[]>}
     *   A promise resolved to the array of the filenames that has been found.
     */
    async list(options) {
      const idb = await this.initializedDB();
      const objectStore = this.getObjectStoreTransaction({ idb });
      const allKeys = await waitForDOMRequest(objectStore.getAllKeys());

      let filteredKeys = allKeys;

      if (options) {
        filteredKeys = filteredKeys.filter(key => {
          let match = true;

          if (typeof options.startsWith === "string") {
            match = match && key.startsWith(options.startsWith);
          }

          if (typeof options.endsWith === "string") {
            match = match && key.endsWith(options.endsWith);
          }

          if (typeof options.includes === "string") {
            match = match && key.includes(options.includes);
          }

          if (typeof options.filterFn === "function") {
            match = match && options.filterFn(key);
          }

          return match;
        });
      }

      return filteredKeys;
    }

    /**
     * Count the number of files stored in the IDBFileStorage.
     *
     * (If any filtering options has been specified, only the file names that match
     * all the filters are included in the final count).
     *
     * @param {IDBFileStorage.ListFilteringOptions} options
     *   The optional filters to apply while listing the stored file names.
     *
     * @returns {Promise<number>}
     *   A promise resolved to the number of files that has been found.
     */
    async count(options) {
      if (!options) {
        const idb = await this.initializedDB();
        const objectStore = this.getObjectStoreTransaction({ idb });
        return waitForDOMRequest(objectStore.count());
      }

      const filteredKeys = await this.list(options);
      return filteredKeys.length;
    }

    /**
     * Retrieve a file stored in the IDBFileStorage by key.
     *
     * @param {string} fileName
     *   The key to use to retrieve the file from the IDBFileStorage.
     *
     * @returns {Promise<Blob|File|IDBPromisedMutableFile>}
     *   A promise resolved once the file stored in the IDBFileStorage has been retrieved.
     */
    async get(fileName) {
      const idb = await this.initializedDB();
      const objectStore = this.getObjectStoreTransaction({ idb });
      return waitForDOMRequest(objectStore.get(fileName)).then(result => {
        if (window.IDBMutableFile && result instanceof window.IDBMutableFile) {
          return new IDBPromisedMutableFile({
            filesStorage: this,
            idb,
            fileName,
            fileType: result.type,
            mutableFile: result
          });
        }

        return result;
      });
    }

    /**
     * Remove all the file objects stored in the IDBFileStorage.
     *
     * @returns {Promise}
     *   A promise resolved once the IDBFileStorage has been cleared.
     */
    async clear() {
      const idb = await this.initializedDB();
      const objectStore = this.getObjectStoreTransaction({ idb, mode: "readwrite" });
      return waitForDOMRequest(objectStore.clear());
    }
  }

  exports.IDBFileStorage = IDBFileStorage;
  /**
   * Retrieve an IDBFileStorage instance by name (and it creates the indexedDB if it doesn't
   * exist yet).
   *
   * @param {Object} [param]
   * @param {string} [param.name="default"]
   *   The name associated to the IDB File Storage.
   * @param {boolean} [param.persistent]
   *   Optionally enable persistent storage mode (not enabled by default).
   *
   * @returns {IDBFileStorage}
   *   The IDBFileStorage instance with the given name.
   */
  async function getFileStorage({ name, persistent } = {}) {
    const filesStorage = new IDBFileStorage({ name: name || "default", persistent });
    await filesStorage.initializedDB();
    return filesStorage;
  }

  /**
   * @external {Blob} https://developer.mozilla.org/en-US/docs/Web/API/Blob
   */

  /**
   * @external {DOMRequest} https://developer.mozilla.org/en/docs/Web/API/DOMRequest
   */

  /**
   * @external {File} https://developer.mozilla.org/en-US/docs/Web/API/File
   */

  /**
   * @external {IDBMutableFile} https://developer.mozilla.org/en-US/docs/Web/API/IDBMutableFile
   */

  /**
   * @external {IDBRequest} https://developer.mozilla.org/en-US/docs/Web/API/IDBRequest
   */
});
//# sourceMappingURL=idb-file-storage.js.map
