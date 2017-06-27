function handleShown() {
  console.log("panel is being shown");
}

function handleHidden() {
  console.log("panel is being hidden");
}

browser.devtools.panels.create(
  "My Panel",           // title
  "icons/star.png",           // icon
  "devtools/panel/panel.html"          // content
).then((newPanel) => {
  newPanel.onShown.addListener(handleShown);
  newPanel.onHidden.addListener(handleHidden);
}); 
