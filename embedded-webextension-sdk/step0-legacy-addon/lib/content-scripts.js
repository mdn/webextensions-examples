const data = require("sdk/self").data;
const pageMod = require("sdk/page-mod");
const notifications = require("sdk/notifications");

pageMod.PageMod({
  include: "*.mozilla.org",
  contentScriptFile: [
    data.url("content-script.js"),
  ],
  onAttach: function(worker) {
    worker.port.on("notify-attached-tab", (msg) => {
      notifications.notify({
        title: "Attached to tab",
        text: msg
      });
    });
  }
});
