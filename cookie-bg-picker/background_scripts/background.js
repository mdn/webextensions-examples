/* Retrieve any previously set cookie and send to content script */

chrome.tabs.onUpdated.addListener(cookieUpdate);

function cookieUpdate(tabId, changeInfo, tab) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    /* inject content script into current tab */

    chrome.tabs.executeScript(null, {
      file: "/content_scripts/updatebg.js"
    });

    // get any previously set cookie for the current tab 

    chrome.cookies.get({
      url: tabs[0].url,
      name: "bgpicker"
    }, function(cookie) {
      if(cookie) {
        var cookieVal = JSON.parse(cookie.value);
        chrome.tabs.sendMessage(tabs[0].id, {image: cookieVal.image});
        chrome.tabs.sendMessage(tabs[0].id, {color: cookieVal.color});
      }
    });
  }); 
}