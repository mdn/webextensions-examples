// devtools-panel.js

const scriptToAttach = "document.body.innerHTML = 'Hi from the devtools';";



window.addEventListener("click", () => {
  browser.runtime.sendMessage({
    tabId: browser.devtools.inspectedWindow.tabId,
    script: scriptToAttach
  });
});
 
/* 
attachContentScriptButton.addEventListener("click", () => {
  browser.runtime.sendMessage({
    tabId: browser.devtools.inspectedWindow.tabId,
    script: scriptToAttach
  });
});

*/
