document.addEventListener("click", function(e) {

  function callOnCurrentWindow(callback){
    chrome.windows.getCurrent(
      function(currentWindow) {
        callback(currentWindow);
      }
    );
  }

  if (e.target.id === "window-update-size_768") {
    callOnCurrentWindow((currentWindow) => {
      updateInfo = {
        width: 768,
        height: 1024
      };

      chrome.windows.update(currentWindow.id, updateInfo);
    });
  }

  if (e.target.id === "window-update-minimize") {
    callOnCurrentWindow((currentWindow) => {
      updateInfo = {
        state: "minimized"
      };

      chrome.windows.update(currentWindow.id, updateInfo);
    });
  }

  else if (e.target.id === "window-create-incognito") {
    createData = {
      incognito: true,
    };
    chrome.windows.create(createData, function(){
      alert("The incognito window has been created");
    });
  }

  else if (e.target.id === "window-remove") {
    callOnCurrentWindow((currentWindow) => {
      chrome.windows.remove(currentWindow.id);
    });
  }

  else if (e.target.id === "window-resize-all") {
    chrome.windows.getAll((windows) => {
      updateInfo = {
        width: 1024,
        height: 768
      };
      for (item of windows) {
        chrome.windows.update(item.id, updateInfo);
      }
    });
  }

  e.preventDefault();
});
