/**
This script is run whenever the devtools are open.
In here, we can create our sidebar, and when the selected node in the inspector
change, we evaluate it and display its properties in the sidebar.
*/

browser.devtools.panels.elements.createSidebarPane("DOM").then(sidebar => {
  browser.devtools.panels.elements.onSelectionChanged.addListener(() => {
    sidebar.setExpression(`$0`);
  });
});
