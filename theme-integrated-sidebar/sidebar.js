function setSidebarStyle(theme) {
  const myElement = document.getElementById("myElement");

  if (theme.colors && theme.colors.frame) {
    document.body.style.backgroundColor =
      theme.colors.frame;
  } else {
    document.body.style.backgroundColor = "white";
  }

  if (theme.colors && theme.colors.toolbar) {
    myElement.style.backgroundColor = theme.colors.toolbar;
  } else {
    myElement.style.backgroundColor = "#ebebeb";
  }
  
  if (theme.colors && theme.colors.toolbar_text) {
    myElement.style.color = theme.colors.toolbar_text;
  } else {
    myElement.style.color = "black";
  }
}

// Set the element style when the extension page loads
async function setInitialStyle() {
  const theme = await browser.theme.getCurrent();
  setSidebarStyle(theme);
}
setInitialStyle();

// Watch for theme updates
browser.theme.onUpdated.addListener(async ({ theme, windowId }) => {
  const sidebarWindow = await browser.windows.getCurrent();
  /*
    Only update theme if it applies to the window the sidebar is in.
    If a windowId is passed during an update, it means that the theme is applied to that specific window.
    Otherwise, the theme is applied globally to all windows.
  */
  if (!windowId || windowId == sidebarWindow.id) {
    setSidebarStyle(theme);
  }
});
