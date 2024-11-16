// NOTE: This implementation does not perform any special actions if the user
// dismisses the consent screen without explicitly granting or rejecting the
// data collection consent request.

const dialog = document.querySelector(".consent-dialog");
const form = document.querySelector(".consent-form");
const anonymousCheckbox =  document.getElementById("anonymous");;
const personalCheckbox = document.getElementById("personal");

/**
 * A collection of the consent checkboxes on the current page. Each checkbox's
 * `id` attribute must be the same as the property name for that grant in the
 * `consent.grants` object stored in `storage.sync`.
 * */
const checkboxes = dialog.querySelectorAll(".consent-block__checkbox");

// Populate checkboxes with their current values. If a checkbox is disabled,
// it's because the assigned value is required and should not be changed.
consent.ready.then(() => {
  for (const checkbox of checkboxes) {
    if (!checkbox.disabled) {
      checkbox.checked = consent[checkbox.id];
    }
  }
});

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
      // if the window was opened by the user (e.g. Cmd+Shift+T to reopen a
      // window, navigating directly to the URL) rather than script
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

// React to async consent update
consent.onUserConsentChange = (grants) => {};
