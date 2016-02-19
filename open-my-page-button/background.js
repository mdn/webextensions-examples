/*
Open a new tab, and load "my-page.html" into it.
*/
function openMyPage() {
  console.log("injecting");
   chrome.tabs.create({
     "url": chrome.extension.getURL("my-page.html")
   });
}


/*
Add openMyPage() as a listener to clicks on the browser action.
*/
chrome.browserAction.onClicked.addListener(openMyPage);
 
