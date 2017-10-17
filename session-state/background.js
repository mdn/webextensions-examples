/**
 * Add a context menu item to borderify the current tab.
 */
browser.menus.create({
  id: "borderify-current-tab",
  title: "Borderify current tab",
  contexts: ["all"]
});

/**
 * The borderify CSS.
 */
const borderCSS = 'body { border: 5px solid red };';

/*
 * Borderifies the current tab, and, using setTabValue, stores the fact
 * that this tab was borderified.
 */
async function borderify() {
  let tabArray = await browser.tabs.query({currentWindow: true, active: true});
  let tabId = tabArray[0].id;
  await browser.tabs.insertCSS(tabId, {code: borderCSS});
  await browser.sessions.setTabValue(tabId, "border-css", borderCSS);
}

browser.menus.onClicked.addListener(borderify);

/*
 * When new tabs are created, we want to check, using getTabValue, whether
 * the tab has the borderified state. That would mean it was borderified, then
 * closed, then reopened, so we want to reapply the borderify CSS.
 *
 * But we can't insertCSS in onCreated, it's too early. So instead we make 
 * an onUpdated listener, just for this tab. In onUpdated we check the tab ID,
 * and if this is our tab, insert the CSS and remove the listener.
 */
browser.tabs.onCreated.addListener((tab) => {
  
  async function borderifyRestored(targetTabId, thisTabId) {
    if (targetTabId === thisTabId) {
      let stored = await browser.sessions.getTabValue(targetTabId, "border-css");
      if (stored) {
        let result = await browser.tabs.insertCSS(targetTabId, {code: stored});
      }
      browser.tabs.onUpdated.removeListener(thisBorderifyRestored);
    }
  }
  
  let thisBorderifyRestored = borderifyRestored.bind(null, tab.id);
  browser.tabs.onUpdated.addListener(thisBorderifyRestored);
});
