browser.windows.onCreated.addListener(themeWindow);

// Theme all currently open windows
browser.windows.getAll().then(wins => wins.forEach(themeWindow));

function themeWindow(window) {
  // Check if the window is in private browsing
  if (window.incognito) {
    browser.theme.update(window.id, {
      images: {
        theme_frame: "",
      },
      colors: {
        frame: "black",
        tab_background_text: "white",
        toolbar: "#333",
        toolbar_text: "white"
      }
    });
  }
  // Reset to the default theme otherwise
  else {
    browser.theme.reset(window.id);
  }
}
