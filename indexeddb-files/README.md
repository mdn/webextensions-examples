# indexeddb-files

This add-on shows how to read and save files using the IndexedDB API and the subset of the "File and Directory Entries API" supported on Firefox.

## What it does ##

The extension includes:

* a browser action which opens a popup with a list of examples
* 2 file manipulations examples (that are opened in a tab by clicking their related link)

## What it shows ##

- **Save files into IndexedDB**: which shows how to read a local directory tree and save all its content into IndexedDB files, then read files from indexedDB and download them as a single zip files.
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

- Quota limits and Storage types:
  * https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Browser_storage_limits_and_eviction_criteria#Firefox_specifics
  * https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API#Storage_limits_and_eviction_criteria

## Acknowledgements

* WebExtension icon courtesy of [icons8.com](http://icons8.com).
