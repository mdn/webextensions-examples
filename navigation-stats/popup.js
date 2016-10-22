// Get the saved stats and render the data in the popup window.
chrome.storage.local.get("hostNavigationStats", results => {
  if (!results.hostNavigationStats) {
    return;
  }

  const {hostNavigationStats} = results;
  const sortedHostnames = Object.keys(hostNavigationStats).sort((a, b) => {
    return hostNavigationStats[a] <= hostNavigationStats[b];
  });

  if (sortedHostnames.length === 0) {
    return;
  }

  let listEl = document.querySelector("ul");
  while(listEl.firstChild)
    listEl.removeChild(listEl.firstChild);

  const MAX_ITEMS = 5;
  for (let i=0; i < sortedHostnames.length; i++) {
    if (i >= MAX_ITEMS) {
      break;
    }

    const listItem = document.createElement("li");
    const hostname = sortedHostnames[i];
    listItem.textContent = `${hostname}: ${hostNavigationStats[hostname]} visit(s)`;
    listEl.appendChild(listItem);
  }
});
