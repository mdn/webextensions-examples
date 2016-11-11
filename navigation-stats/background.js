// Load existent stats with the storage API.
var gettingStoredStats = browser.storage.local.get("hostNavigationStats");
gettingStoredStats.then(results => {
  // Initialize the saved stats if not yet initialized.
  if (!results.hostNavigationStats) {
    results = {
      hostNavigationStats: {}
    };
  }

  const {hostNavigationStats} = results;

  // Monitor completed navigation events and update
  // stats accordingly.
  browser.webNavigation.onCompleted.addListener(evt => {
    // Filter out any sub-frame related navigation event
    if (evt.frameId !== 0) {
      return;
    }

    const url = new URL(evt.url);

    hostNavigationStats[url.hostname] = hostNavigationStats[url.hostname] || 0;
    hostNavigationStats[url.hostname]++;

    // Persist the updated stats.
    browser.storage.local.set(results);
  }, {
    url: [{schemes: ["http", "https"]}]});
});
