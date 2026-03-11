let activeThemeEl = document.querySelector("#active-theme");
let readmeEl = document.querySelector("#read-me");

function updateThemeInfo(info) {
  activeThemeEl.textContent = `${info.name} (${info.id})`;
}

// Include the README.md file content into the test page.
fetch("/README.md").then(r => r.text()).then(text => {
  readmeEl.textContent = text;
});

// Set active theme info element content on page load.
browser.management.getAll().then(addons => {
  updateThemeInfo(addons.find(addon => addon.type == "theme" && addon.enabled));
});

// Show pageAction icon on the extension page.
browser.tabs.getCurrent().then(tabInfo => {
  browser.pageAction.show(tabInfo.id);
});

// Update active theme info when a theme is enabled.
browser.management.onEnabled.addListener(info => {
  if (info.type !== "theme") {
    return;
  }
  updateThemeInfo(info);
});
