/*
Default settings. Initialize storage to these values.
*/
let authCredentials = {
  username: "user",
  password: "passwd"
}

/*
Generic error logger.
*/
function onError(e) {
  console.error(e);
}

/*
On startup, check whether we have stored settings.
If we don't, then store the default settings.
*/
function checkStoredSettings(storedSettings) {
  if (!storedSettings.authCredentials) {
    browser.storage.local.set({authCredentials});
  }
}

const gettingStoredSettings = browser.storage.local.get();
gettingStoredSettings.then(checkStoredSettings, onError);
