function themeWindow(window) {   
    browser.theme.update(window.id, 
    {
      "images": {
	"headerURL": "resource/weta.png"
      },
    
      "colors": {
       "accentcolor": "#adb09f",
       "textcolor": "#000"
      }
      
    });
}
  
  browser.windows.onCreated.addListener(themeWindow);
  browser.windows.getAll().then(wins => wins.forEach(themeWindow));

