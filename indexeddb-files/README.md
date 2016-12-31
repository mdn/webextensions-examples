# indexeddb-files

This add-on shows how to read and save files using the IndexedDB API and the sub-set of the "File and Directory Entries API" supported on Firefox.

## What it does ##

The extension includes:

* a browser action which opens a new extension tab
* 3 examples that can be loaded by the extension tab opened by clicking the browser action.

## What it shows ##

- **Reading files from a local directory tree**: which shows how to use the sub-set of the "File and Directory API" supported on Firefox to read a directory tree instead of single files
- **Save files into IndexedDB**: which shows how to use the IndexedDB files to save and read files from indexedDB (and how to extract of the files as a single zip files)
- **Create temporary files**: which shows how to use the MutableFile API exposed by the IndexedDB API to create mutable files and save them using the IndexedDB API.

## More docs on MDN ##

- File and Directory Entries API:
  * https://developer.mozilla.org/en-US/docs/Web/API/File_and_Directory_Entries_API/Firefox_support
  * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory
  * https://developer.mozilla.org/en-US/docs/Web/API/File
  * https://developer.mozilla.org/en-US/docs/Web/API/Blob
  * https://developer.mozilla.org/en-US/docs/Web/API/FileReader

- IndexedDB API:
  * https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API

- IndexedDB MutableFile API:
  * https://developer.mozilla.org/en-US/docs/Web/API/IDBMutableFile

## Acknowledgements

* WebExtension icon courtesy of [icons8.com](http://icons8.com).
