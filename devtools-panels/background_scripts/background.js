
function handleMessage(request, sender, sendResponse) {
 
  browser.tabs.executeScript(
    request.tabId, 
    {
      code: request.script
    });
  
//  console.log(request.script);
}

browser.runtime.onMessage.addListener(handleMessage); 

