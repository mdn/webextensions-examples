/* initialise variables */

var bgBtns = document.querySelectorAll('.bg-container button');
var colorPick = document.querySelector('input');
var reset = document.querySelector('.color-reset button');
var cookieVal = { image : '',
                  color : '' };

/* apply backgrounds to buttons */
/* add listener so that when clicked, button applies background to page HTML */

for(var i = 0; i < bgBtns.length; i++) {
  var imgName = bgBtns[i].getAttribute('class');
  var bgImg = 'url(\'images/' + imgName + '.png\')';
  bgBtns[i].style.backgroundImage = bgImg;

  bgBtns[i].onclick = function(e) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var imgName = e.target.getAttribute('class');
      var fullURL = chrome.extension.getURL('popup/images/'+ imgName + '.png');
      chrome.tabs.sendMessage(tabs[0].id, {image: fullURL});

      cookieVal.image = fullURL;
      chrome.cookies.set({
        url: tabs[0].url,
        name: "bgpicker", 
        value: JSON.stringify(cookieVal)
      })
    });
  }
}

/* apply chosen color to HTML background */

colorPick.onchange = function(e) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var currColor = e.target.value;
    chrome.tabs.sendMessage(tabs[0].id, {color: currColor});

    cookieVal.color = currColor;
    chrome.cookies.set({
      url: tabs[0].url,
      name: "bgpicker", 
      value: JSON.stringify(cookieVal)
    })
  });
}

/* reset background */

reset.onclick = function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {reset: true});

    cookieVal = { image : '',
                  color : '' };
    chrome.cookies.remove({
      url: tabs[0].url,
      name: "bgpicker" 
    })
  });
}