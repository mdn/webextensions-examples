function themeWindow(window) {   
    browser.theme.update(window.id, 
    {
      images: 
      {
	headerURL: "resource/empty.png",
	additional_backgrounds: [ "resource/weta_for_tiling.png"]
      },    
      properties: 
      {
	"additional_backgrounds_alignment": [ "top" ],
        "additional_backgrounds_tiling": [ "repeat"  ]
      },
      colors: {
       accentcolor: "#adb09f",
       textcolor: "#000"
      }      
    });
}
  
  browser.windows.onCreated.addListener(themeWindow);
  browser.windows.getAll().then(wins => wins.forEach(themeWindow));

