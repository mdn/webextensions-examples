// NOTE: This implementation does not perform any special actions if the user
// dismisses the consent screen without explicitly granting or rejecting the
// data collection consent request.

const dialog = document.querySelector(".consent-dialog");

/**
 * A collection of the consent checkboxes on the current page. Each checkbox's
 * `id` attribute must be the same as the property name for that grant in the
 * `consent.grants` object stored in `storage.sync`.
 * */
const checkboxes = dialog.querySelectorAll(".consent-block__checkbox");

// Populate checkboxes with their current values. If a checkbox is disabled,
// it's because the assigned value is the one required and must not be changed.
consent.ready.then(() => {
  setCheckboxState();
});

// React to async consent updates
consent.onUserConsentChange = () => {
  setCheckboxState();
};

dialog.addEventListener("close", async () => {
  switch(dialog.returnValue) {
    case "reject": {
      browser.management.uninstallSelf();
      break;
    }
    case "accept": {
      // Update the consent with the the user's selected grant values
      for (const checkbox of checkboxes) {
        consent.setConsent(checkbox.id, checkbox.checked);
      }
      // Write the values to sync storage
      await consent.flush();
      // Use WebExtensions APIs to close the window. `window.close()` can fail
      // if the window was opened by the user (e.g., Cmd+Shift+T to reopen a
      // window or navigating to the URL) rather than with a script
      // (browser.tabs.create()).
      const [ tab ] = await browser.tabs.query({active: true, lastFocusedWindow: true});
      browser.tabs.remove(tab.id);
      break;
    }
    default: {
      console.error(`Unknown dialog return value:`, dialog.returnValue);
    }
  }
});

function insertLocaleStrings() {
  const elements = document.querySelectorAll("[data-locale-message]");
  for (const el of elements) {
    const messageId = el.dataset.localeMessage;
    const message = browser.i18n.getMessage(messageId);
    if (messageId.endsWith("HTML")) {
      const sanitized = DOMPurify.sanitize(message);
      el.innerHTML = sanitized;
    } else {
      el.textContent = message;
    }
  }
}

insertLocaleStrings();

function setCheckboxState() {
  for (const checkbox of checkboxes) {
    if (!checkbox.disabled) {
      checkbox.checked = consent[checkbox.id];
    }
  }
}
