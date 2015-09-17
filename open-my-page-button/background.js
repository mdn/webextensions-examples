 chrome.browserAction.onClicked.addListener(openMyPage);
 
 function openMyPage() {
   console.log("injecting");
    chrome.tabs.create({
      "url": chrome.extension.getURL("my-page.html")
    }); 
 }
 
