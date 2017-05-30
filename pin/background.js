browser.commands.onCommand.addListener(function(command) {
  if (command == "toggle-pin") {
    // Get the currently selected tab
    browser.tabs.query({active: true, currentWindow: true})

    .then(function(tabs) {
      // Toggle the pinned status
      var current = tabs[0]
      browser.tabs.update(current.id, {'pinned': !current.pinned});
    });
  }
});
