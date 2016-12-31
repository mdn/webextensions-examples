document.querySelector("#filepicker").addEventListener("change", (event) => {
  let output = document.querySelector("#files-list");
  let files = event.target.files;

  for (let i=0; i<files.length; i++) {
    let item = document.createElement("li");

    // NOTE: webkitRelativePath contains the path relative to the selected directory.
    item.innerHTML = files[i].webkitRelativePath;
    output.appendChild(item);

    // NOTE: open the console to see the other fields available on the file object,
    // e.g.
    // - filename (the name of the name, without the path)
    // - type (its mime type)
    // - lastModifiedDate (the date of the last when the file has been changed)
    // - size (the size of the file in bytes)
    //
    // more docs are available on MDN: https://developer.mozilla.org/en-US/docs/Web/API/File
    //
    // and the available operations (which are the one available on the Blob objects), e.g.
    //
    // - slice (which produces a new Blob which contains parts of the file content)
    //
    // more docs are available on MDN: https://developer.mozilla.org/en-US/docs/Web/API/Blob
    // and https://developer.mozilla.org/en-US/docs/Web/API/FileReader
    console.log("FILE", files[i]);
  };
}, false);
