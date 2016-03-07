
browser.commands.getAll(function(commands) {
  commands.forEach(function(command) {
    console.log(command);
  });
});

browser.commands.onCommand.addListener(function(command) {
  console.log("onCommand event received for message: ", command);
});