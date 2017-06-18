const proxyServerAddressInput = document.querySelector("#proxyServerAddressInput");
const proxyServerPortInput = document.querySelector("#proxyServerPortInput");
const proxyServerUsernameInput = document.querySelector("#proxyServerUsernameInput");
const proxyServerPasswordInput = document.querySelector("#proxyServerPasswordInput");
const proxyServerTypeInput = document.querySelector('input[name=proxyServerTypeInput]:checked');

// Store the currently selected settings using browser.storage.local.
function storeSettings() {
  let proxyServerInfo = {
		proxyServerAddress: proxyServerAddressInput.value,
		proxyServerPort: proxyServerPortInput.value,
		proxyServerType: proxyServerTypeInput.value
	};

	// authCrendentials object is handed directly to browser.webRequest.onAuthRequired()
	// so it's variable name format varies from our other variables in order to fulfill the API specifcation
	let authCredentials = {
		username: proxyServerUsernameInput.value,
		password: proxyServerPasswordInput.value,
	};

	console.log("Storing settings");
  browser.storage.local.set({
    proxyServerInfo, authCredentials
  });
}

// Update the options UI with the settings values retrieved from storage,
// or the default settings if the stored settings are empty.
function updateUI(restoredSettings) {
	if (restoredSettings.proxyServerInfo) {
		console.log(`updateUI: ${restoredSettings.proxyServerInfo}`);
  	proxyServerAddressInput.value = restoredSettings.proxyServerInfo.proxyServerAddress;
		proxyServerPortInput.value = restoredSettings.proxyServerInfo.proxyServerPort;
		proxyServerTypeInput.value = restoredSettings.proxyServerInfo.proxyServerType;
	}
	if (restoredSettings.authCredentials) {
	console.log(`updateUI: ${restoredSettings.authCredentials}`);
		proxyServerUsernameInput.value = restoredSettings.authCredentials.username;
		proxyServerPasswordInput.value = restoredSettings.authCredentials.password;
	}
}

function onError(e) {
	console.error(e);
}

// On opening the options page, fetch stored settings and update the UI with them.
browser.storage.local.get().then(updateUI, onError);

// Whenever the contents of the textarea changes, save the new values
proxyServerAddressInput.addEventListener("change", storeSettings);
proxyServerPortInput.addEventListener("change", storeSettings);
proxyServerUsernameInput.addEventListener("change", storeSettings);
proxyServerPasswordInput.addEventListener("change", storeSettings);
proxyServerTypeInput.addEventListener("change", storeSettings);