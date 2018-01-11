function themeWindow(window) {   
    browser.theme.update(window.id, 
    {

      "images": {
	  "theme_frame": "resource/weta.png"
      },
    
      "colors": {
	  "frame": [ 173 , 176 , 159 ],
	  "tab_text": [ 0 , 0 , 0 ]
      }     
    });
}
  
  browser.windows.onCreated.addListener(themeWindow);
  browser.windows.getAll().then(wins => wins.forEach(themeWindow));

