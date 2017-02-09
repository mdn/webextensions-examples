/*
Default settings. If there is nothing in storage, use these values.
*/
var defaultSettings = {
  since: "hour",
  dataTypes: ["history", "downloads"]
};

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
  return (new Date()).getTime() - sinceMilliseconds;
}

/*
Convert from an array of strings, representing data types,
to an object suitable for passing into browsingData.remove().
*/
function getTypes(selectedTypes) {
  let dataTypes = {};
  for (item of selectedTypes) {
    dataTypes[item] = true;
  }
  return dataTypes;
}

/*
Forget browsing data, according to the settings passed in as storedSettings
or, if this is empty, according to the default settings.
*/
function forget(storedSettings) {
  if (!storedSettings.since || !storedSettings.dataTypes) {
    storedSettings = defaultSettings;
  }
  
  const since = getSince(storedSettings.since);
  const dataTypes = getTypes(storedSettings.dataTypes);

  browser.browsingData.remove({since}, dataTypes);
}

function onError(e) {
  console.error(e);
}

/*
On click, fetch stored settings and forget browsing data.
*/
browser.browserAction.onClicked.addListener(() => {
  const gettingStoredSettings = browser.storage.local.get();
  gettingStoredSettings.then(forget, onError);
});
