/* Retrieve any previously set cookie and send to content script */

browser.tabs.onUpdated.addListener(cookieUpdate);

function getActiveTab() {
  return browser.tabs.query({active: true, currentWindow: true});
}

function cookieUpdate(tabId, changeInfo, tab) {
  getActiveTab().then((tabs) => {
    /* inject content script into current tab */

    browser.tabs.executeScript(null, {
      file: "/content_scripts/updatebg.js"
    });

    // get any previously set cookie for the current tab 
    var gettingCookies = browser.cookies.get({
      url: tabs[0].url,
      name: "bgpicker"
    });
    gettingCookies.then((cookie) => {
      if(cookie) {
        var cookieVal = JSON.parse(cookie.value);
        browser.tabs.sendMessage(tabs[0].id, {image: cookieVal.image});
        browser.tabs.sendMessage(tabs[0].id, {color: cookieVal.color});
      }
    });
  }); 
}
