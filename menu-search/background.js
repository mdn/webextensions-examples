/*
Create a menu item for each installed search engine.
The ID and title are both set to the search engine's name.
*/
function createMenuItem(engines) {
  for (let engine of engines) {
    browser.menus.create({
      id: engine.name,
      title: engine.name,
      contexts: ["selection"]
    });
  }
}

browser.search.get().then(createMenuItem);

/*
Search using the search engine whose name matches the
menu item's ID.
*/
browser.menus.onClicked.addListener((info, tab) => {
  browser.search.search({
    query: info.selectionText,
    engine: info.menuItemId
  });
});
