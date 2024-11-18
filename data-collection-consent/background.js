globalThis.browser ??= chrome;

// React to async consent update
consent.onUserConsentChange = () => {
  if (consent.hasUserSetConsent()) {
    // User consent is configured
    browser.action.setPopup({popup: "action.html"});
  } else {
    browser.action.setPopup({popup: ""});
  }
};

// Show the consent dialog on initial installation. If browser.storage.sync
browser.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === "install") {
    if (await consent.showConsentDialog()) return;
  }
});

// Show the consent dialog if the user hasn't configured consent, otherwise show
// the popup window.
browser.action.onClicked.addListener(async () => {
  if (await consent.showConsentDialog()) return;

  browser.action.setPopup({popup: "action.html"});
  browser.action.openPopup();
});
