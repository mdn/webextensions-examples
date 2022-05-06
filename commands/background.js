/**
 * Returns all of the registered extension commands for this extension
 * and their shortcut (if active).
 *
 * Since there are 2 registered commands in this extension, the returned
 * `commandsArray` will look like the following:
 *    [
 *      {
 *        name: "Command 1",
 *        description: "Send a 'Command 1' event to the extension"
 *        shortcut: "Ctrl+Shift+U"
 *      },
 *      {
 *        name: "Command 2",
 *        description: "Send a 'Command 2' event to the extension"
 *        shortcut: ""
 *      }
 *    ]
 */
let gettingAllCommands = browser.commands.getAll();
gettingAllCommands.then((commands) => {
  for (let command of commands) {
  /*
   * Note that this sends message to the Add-on Debugger's console, and not the
   * regular Web console.
   * See https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Debugging
   */
    console.log(command);
  }
});

/**
 * Fired when a registered command is activated using a keyboard shortcut.
 *
 * In this sample extension, there is only one registered command: "Ctrl+Shift+U".
 * On Mac, this command will automatically be converted to "Command+Shift+U".
 */
browser.commands.onCommand.addListener((command) => {

  if (command === 'Command 1'){
    browser.tabs.create({url: "https://developer.mozilla.org"});
  } else if (command === 'Command 2'){
    browser.tabs.create({url: "https://addons.mozilla.org"});
  } else {
    /*
     * Note that this sends message to the Add-on Debugger's console, and not
     * the regular Web console.
     * See https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Debugging
     */
    console.log("Unexpected command: ", command);
  }
});
