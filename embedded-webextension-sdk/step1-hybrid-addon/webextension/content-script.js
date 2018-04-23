browser.runtime.sendMessage({
  type: "notify-attached-tab",
  message: window.location.href,
});
