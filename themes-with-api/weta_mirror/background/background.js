function themeWindow(window) {   
    browser.theme.update(window.id, 
    {
      "images": {
	"headerURL": "empty.png",
	"additional_backgrounds": [ 
	  "resource/weta.png", 
	  "resource/weta-left.png"
	]
      },

      "properties": {
	"additional_backgrounds_alignment": [ 
	  "right top" , 
	  "left top" 
	]
      },
    
      "colors": {
	"accentcolor": "#adb09f",
	"textcolor": "#000"
      }
      
    });
}
  
  browser.windows.onCreated.addListener(themeWindow);
  browser.windows.getAll().then(wins => wins.forEach(themeWindow));

