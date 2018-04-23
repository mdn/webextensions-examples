const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");

/*
Store the currently selected settings using browser.storage.local.
*/
function storeSettings() {
  browser.storage.local.set({
    authCredentials: {
      username: usernameInput.value,
      password: passwordInput.value
    }
  });
}

/*
Update the options UI with the settings values retrieved from storage,
or the default settings if the stored settings are empty.
*/
function updateUI(restoredSettings) {
  usernameInput.value = restoredSettings.authCredentials.username || "";
  passwordInput.value = restoredSettings.authCredentials.password || "";
}

function onError(e) {
  console.error(e);
}

/*
On opening the options page, fetch stored settings and update the UI with them.
*/
const gettingStoredSettings = browser.storage.local.get();
gettingStoredSettings.then(updateUI, onError);

/*
On blur, save the currently selected settings.
*/
usernameInput.addEventListener("blur", storeSettings);
passwordInput.addEventListener("blur", storeSettings);
