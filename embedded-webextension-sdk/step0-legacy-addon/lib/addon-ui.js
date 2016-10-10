const { ToggleButton } = require('sdk/ui/button/toggle');
const panels = require("sdk/panel");
const self = require("sdk/self");
const ss = require("sdk/simple-storage");
const sp = require("sdk/simple-prefs");

const button = ToggleButton({
  id: "my-button",
  label: "my button",
  icon: {
    "32": self.data.url("icons/icon-32.png"),
  },
  onChange: handleChange,
});

const panel = panels.Panel({
  contentURL: self.data.url("popup.html"),
  onHide: handleHide,
});

panel.on("show", () => {
  panel.port.emit("got-user-data", {
    prefs: {
      superImportantUserPref: sp.prefs["superImportantUserPref"],
    },
    storage:  {
      superImportantUserStoredData: ss.storage.superImportantUserStoredData,
    },
  });
});

function handleChange(state) {
  if (state.checked) {
    panel.show({
      position: button,
    });
  }
}

function handleHide() {
  button.state('window', {checked: false});
}
