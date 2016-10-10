// Load existent stats with the storage API.
chrome.storage.local.get("hostNavigationStats", results => {
  // Initialize the saved stats if not yet initialized.
  if (!results.hostNavigationStats) {
    results = {
      hostNavigationStats: {}
    };
  }

  const {hostNavigationStats} = results;

  // Monitor completed navigation events and update
  // stats accordingly.
  chrome.webNavigation.onCompleted.addListener(evt => {
    // Filter out any sub-frame related navigation event
    if (evt.frameId !== 0) {
      return;
    }

    const url = new URL(evt.url);

    hostNavigationStats[url.hostname] = hostNavigationStats[url.hostname] || 0;
    hostNavigationStats[url.hostname]++;

    // Persist the updated stats.
    chrome.storage.local.set(results);
  }, { url: [{schemes: ["http", "https"]}]});
});
