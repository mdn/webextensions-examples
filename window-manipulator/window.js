document.addEventListener("click", (e) => {

  function callOnCurrentWindow(callback){
    chrome.windows.getCurrent((currentWindow) => {
      callback(currentWindow);
    });
  }

  if (e.target.id === "window-update-size_768") {
    callOnCurrentWindow((currentWindow) => {
      var updateInfo = {
        width: 768,
        height: 1024
      };

      chrome.windows.update(currentWindow.id, updateInfo);
    });
  }

  if (e.target.id === "window-update-minimize") {
    callOnCurrentWindow((currentWindow) => {
      var updateInfo = {
        state: "minimized"
      };

      chrome.windows.update(currentWindow.id, updateInfo);
    });
  }

  else if (e.target.id === "window-create-incognito") {
    var createData = {
      incognito: true,
    };
    chrome.windows.create(createData, () => {
      console.log("The incognito window has been created");
    });
  }

  else if (e.target.id === "window-remove") {
    callOnCurrentWindow((currentWindow) => {
      chrome.windows.remove(currentWindow.id);
    });
  }

  else if (e.target.id === "window-resize-all") {
    chrome.windows.getAll((windows) => {
      var updateInfo = {
        width: 1024,
        height: 768
      };
      for (var item of windows) {
        chrome.windows.update(item.id, updateInfo);
      }
    });
  }

  e.preventDefault();
});
