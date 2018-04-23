/*
Default settings. If there is nothing in storage, use these values.
*/
var defaultSettings = {
  since: "hour",
  dataTypes: ["history", "downloads"]
};

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
  if (!storedSettings.since || !storedSettings.dataTypes) {
    browser.storage.local.set(defaultSettings);
  }
}

const gettingStoredSettings = browser.storage.local.get();
gettingStoredSettings.then(checkStoredSettings, onError);

/*
Forget browsing data, according to the settings passed in as storedSettings
or, if this is empty, according to the default settings.
*/
function forget(storedSettings) {

  /*
  Convert from a string to a time.
  The string is one of: "hour", "day", "week", "forever".
  The time is given in milliseconds since the epoch.
  */
  function getSince(selectedSince) {
    if (selectedSince === "forever") {
      return 0;
    }

    const times = {
      hour: () => { return 1000 * 60 * 60 },
      day: () => { return 1000 * 60 * 60 * 24 },
      week: () => { return 1000 * 60 * 60 * 24 * 7}
    }

    const sinceMilliseconds = times[selectedSince].call();
    return Date.now() - sinceMilliseconds;
  }

  /*
  Convert from an array of strings, representing data types,
  to an object suitable for passing into browsingData.remove().
  */
  function getTypes(selectedTypes) {
    let dataTypes = {};
    for (let item of selectedTypes) {
      dataTypes[item] = true;
    }
    return dataTypes;
  }

  const since = getSince(storedSettings.since);
  const dataTypes = getTypes(storedSettings.dataTypes);

  function notify() {
    let dataTypesString = Object.keys(dataTypes).join(", ");
    let sinceString = new Date(since).toLocaleString();
    browser.notifications.create({
      "type": "basic",
      "title": "Removed browsing data",
      "message": `Removed ${dataTypesString}\nsince ${sinceString}`
    });
  }

  browser.browsingData.remove({since}, dataTypes).then(notify);
}

/*
On click, fetch stored settings and forget browsing data.
*/
browser.browserAction.onClicked.addListener(() => {
  const gettingStoredSettings = browser.storage.local.get();
  gettingStoredSettings.then(forget, onError);
});
