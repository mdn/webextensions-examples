  const proxyServerAddressInput = document.querySelector("#proxyServerAddressInput");
  const proxyServerPortInput = document.querySelector("#proxyServerPortInput");
  const proxyServerUsernameInput = document.querySelector("#proxyServerUsernameInput");
  const proxyServerPasswordInput = document.querySelector("#proxyServerPasswordInput");
  const saveButton = document.querySelector("#saveButton");

  // Store the currently selected settings using browser.storage.local.
  function storeSettings() {
    let proxyServerInfo = {
	    proxyServerAddress: proxyServerAddressInput.value,
	    proxyServerPort: proxyServerPortInput.value,
	    proxyServerType: document.querySelector("input[name=proxyServerTypeInput]:checked").value
    };

    // authCredentials object is handed directly to browser.webRequest.onAuthRequired()
    // so its variable name format varies from our other variables in order to fulfill the API specifcation
    let authCredentials = {
	    username: proxyServerUsernameInput.value,
	    password: proxyServerPasswordInput.value,
    };

    console.log("Storing settings");
    browser.storage.local.set({
	    proxyServerInfo, authCredentials
    });
  }

  // Update the options UI with the settings values retrieved from storage.
  function updateUI(restoredSettings) {
    if (restoredSettings.proxyServerInfo) {
	    console.log(`in updateUI() proxyServerInfo is: ${JSON.stringify(restoredSettings.proxyServerInfo)}`);
	    proxyServerAddressInput.value = restoredSettings.proxyServerInfo.proxyServerAddress;
	    proxyServerPortInput.value = restoredSettings.proxyServerInfo.proxyServerPort;
	    document.getElementById(restoredSettings.proxyServerInfo.proxyServerType.toLowerCase()).checked = true;
    }
    if (restoredSettings.authCredentials) {
      console.log(`in updateUI() authCredentials are: ${JSON.stringify(restoredSettings.authCredentials)}`);
	    proxyServerUsernameInput.value = restoredSettings.authCredentials.username;
	    proxyServerPasswordInput.value = restoredSettings.authCredentials.password;
    }
  }

  function onError(e) {
    console.error(e);
  }

  // On opening the options page, fetch stored settings and update the UI with them.
  browser.storage.local.get().then(updateUI, onError);

  // Whenever save is clicked, save the new values
  saveButton.addEventListener("click", storeSettings);
