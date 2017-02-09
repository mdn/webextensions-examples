var defaultSettings = {
  since: "hour",
  dataTypes: ["history", "downloads"]
};

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

function getTypes(selectedTypes) {
  let dataTypes = {};
  for (item of selectedTypes) {
    dataTypes[item] = true;
  }
  return dataTypes;
}

function forget(storedSettings) {
  if (!storedSettings.since || !storedSettings.dataTypes) {
    storedSettings = defaultSettings;
  }
  
  const since = getSince(storedSettings.since);
  const dataTypes = getTypes(storedSettings.dataTypes);
  
  console.log(new Date(since));
  console.log(dataTypes);

  browser.browsingData.remove({since}, dataTypes);
}

function onError(e) {
  console.error(e);
}

browser.browserAction.onClicked.addListener(() => {
  const gettingStoredSettings = browser.storage.local.get();
  gettingStoredSettings.then(forget, onError);
});
