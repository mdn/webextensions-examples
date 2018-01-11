function themeWindow(window) {   
    browser.theme.update(window.id, 
    {
      "images": {
	"headerURL": "resource/parrot.png"
      },
    
      "colors": {
	"accentcolor": "#ffffff",
	"textcolor": "#000"
      }      
    });
}
  
  browser.windows.onCreated.addListener(themeWindow);
  browser.windows.getAll().then(wins => wins.forEach(themeWindow));

