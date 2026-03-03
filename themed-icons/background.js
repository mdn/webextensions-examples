async function openOrSelectTab(reloadExistingTab = false) {
  const tabUrl = browser.runtime.getURL("/extpage.html");
  let [tab] = await browser.tabs.query({ url: tabUrl });
  if (!tab) {
    await browser.tabs.create({ url: tabUrl, active: true });
  } else {
    await browser.tabs.update(tab.id, {
      active: true,
      ...(reloadExistingTab ? { url: tabUrl } : {})
    });
  }
}

async function switchToNextTheme() {
  openOrSelectTab();
  const themes = await browser.management.getAll().then(extensions => {
    return extensions.filter(ext => ext.type === "theme");
  });
  const activeThemeIndex = themes.findIndex(theme => theme.enabled);
  const nextThemeIndex = activeThemeIndex < themes.length - 1
    ? activeThemeIndex + 1
    : 0
  const nextTheme = themes[nextThemeIndex];
  await browser.management.setEnabled(nextTheme.id, true);
}

// Switch to the next theme available on pageAction or action icons clicks.
browser.pageAction.onClicked.addListener(switchToNextTheme);
browser.action.onClicked.addListener(switchToNextTheme);

// Open or select the extension test page on addon startup.
openOrSelectTab(true);
