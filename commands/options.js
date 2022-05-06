/**
 * Update the UI: set the value of the shortcut textbox.
 */
async function updateUI() {
  let commands = await browser.commands.getAll();
  for (command of commands) {
      if (command.name === 'Command 1') {
        document.querySelector('#shortcut1').value = command.shortcut;
        document.querySelector('#description1').value = command.description;
      } else if (command.name === 'Command 2') {
        document.querySelector('#shortcut2').value = command.shortcut;
        document.querySelector('#description2').value = command.description;
      }
    }
  }
}

/**
 * Update the shortcut based on the value in the textbox.
 */
async function updateShortcuts() {
  await browser.commands.update({
    name: 'Command 1',
    shortcut: document.querySelector('#shortcut1').value,
    description: document.querySelector('#description1').value
  });

  await browser.commands.update({
    name: 'Command 2',
    shortcut: document.querySelector('#shortcut2').value,
    description: document.querySelector('#description2').value
  });
}

/**
 * Reset the shortcut and update the textbox.
 */
async function resetShortcuts() {
  await browser.commands.reset('Command 1');
  await browser.commands.reset('Command 2');

  // Refresh the UI
  updateUI();
}

/**
 * Update the UI when the page loads.
 */
document.addEventListener('DOMContentLoaded', updateUI);

/**
 * Handle update and reset button clicks
 */
document.querySelector('#update').addEventListener('click', updateShortcuts)
document.querySelector('#reset').addEventListener('click', resetShortcuts)
