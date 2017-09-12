document.addEventListener("click", (e) => {

  function getCurrentWindow() {
    return browser.windows.getCurrent();
  }

  if (e.target.id === "window-update-size_768") {
    getCurrentWindow().then((currentWindow) => {
      var updateInfo = {
        width: 768,
        height: 1024
      };

      browser.windows.update(currentWindow.id, updateInfo);
    });
  }

  if (e.target.id === "window-update-minimize") {
    getCurrentWindow().then((currentWindow) => {
      var updateInfo = {
        state: "minimized"
      };

      browser.windows.update(currentWindow.id, updateInfo);
    });
  }

  else if (e.target.id === "window-create-normal") {
    let createData = {};
    let creating = browser.windows.create(createData);
    creating.then(() => {
      console.log("The normal window has been created");
    });
  }

  else if (e.target.id === "window-create-incognito") {
    let createData = {
      incognito: true,
    };
    let creating = browser.windows.create(createData);
    creating.then(() => {
      console.log("The incognito window has been created");
    });
  }

  else if (e.target.id === "window-create-panel") {
    let createData = {
      type: "panel",
    };
    let creating = browser.windows.create(createData);
    creating.then(() => {
      console.log("The panel has been created");
    });
  }

  else if (e.target.id === "window-create-detached-panel") {
    let createData = {
      type: "detached_panel",
    };
    let creating = browser.windows.create(createData);
    creating.then(() => {
      console.log("The detached panel has been created");
    });
  }

  else if (e.target.id === "window-create-popup") {
    let createData = {
      type: "popup",
    };
    let creating = browser.windows.create(createData);
    creating.then(() => {
      console.log("The popup has been created");
    });
  }

  else if (e.target.id === "window-remove") {
    getCurrentWindow().then((currentWindow) => {
      browser.windows.remove(currentWindow.id);
    });
  }

  else if (e.target.id === "window-resize-all") {
    var gettingAll = browser.windows.getAll();
    gettingAll.then((windows) => {
      var updateInfo = {
        width: 1024,
        height: 768
      };
      for (var item of windows) {
        browser.windows.update(item.id, updateInfo);
      }
    });
  }

  else if (e.target.id === "window-preface-title") {
    getCurrentWindow().then((currentWindow) => {
      let updateInfo = {
        titlePreface: "Preface | "
      }
      browser.windows.update(currentWindow.id, updateInfo);
    });
  }

  e.preventDefault();
});
