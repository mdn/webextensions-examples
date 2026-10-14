browser.action.onClicked.addListener((tab) => {
  browser.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      // func is serialized and executed in the context of the web page.
      alert("Clicked extension button and ran script at " + document.URL);
    },
    injectImmediately: true,
  });
});
