/* Retrieve any previously set cookie and send to content script */

function getActiveTab() {
  return browser.tabs.query({
    active: true,
    currentWindow: true,
  }).then(tabs => tabs[0]);
}

function cookieUpdate() {
  getActiveTab().then((tab) => {
    // get any previously set cookie for the current tab 
    let gettingCookies = browser.cookies.get({
      url: tab.url,
      name: "bgpicker"
    });
    gettingCookies.then((cookie) => {
      if (cookie) {
        let cookieVal = JSON.parse(cookie.value);
        browser.tabs.sendMessage(tab.id, {image: cookieVal.image});
        browser.tabs.sendMessage(tab.id, {color: cookieVal.color});
      }
    });
  }); 
}

// update when the tab is updated
browser.tabs.onUpdated.addListener(cookieUpdate);
// update when the tab is activated
browser.tabs.onActivated.addListener(cookieUpdate);
