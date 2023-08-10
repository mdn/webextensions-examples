/* initialise variables */

let bgBtns = document.querySelectorAll('.bg-container button');
let colorPick = document.querySelector('input');
let reset = document.querySelector('.color-reset button');
let cookieVal = { image : '',
                  color : '' };

function getActiveTab() {
  return browser.tabs.query({active: true, currentWindow: true});
}

/* apply backgrounds to buttons */
/* add listener so that when clicked, button applies background to page HTML */

for(let i = 0; i < bgBtns.length; i++) {
  let imgName = bgBtns[i].getAttribute('class');
  let bgImg = 'url(\'images/' + imgName + '.png\')';
  bgBtns[i].style.backgroundImage = bgImg;

  bgBtns[i].onclick = function(e) {
    getActiveTab().then((tabs) => {
      let imgName = e.target.getAttribute('class');
      let fullURL = browser.extension.getURL('popup/images/'+ imgName + '.png');
      browser.tabs.sendMessage(tabs[0].id, {image: fullURL});

      cookieVal.image = fullURL;
      browser.cookies.set({
        url: tabs[0].url,
        name: "bgpicker", 
        value: JSON.stringify(cookieVal)
      })
    });
  }
}

/* apply chosen color to HTML background */

colorPick.onchange = function(e) {
  getActiveTab().then((tabs) => {
    let currColor = e.target.value;
    browser.tabs.sendMessage(tabs[0].id, {color: currColor});

    cookieVal.color = currColor;
    browser.cookies.set({
      url: tabs[0].url,
      name: "bgpicker", 
      value: JSON.stringify(cookieVal)
    })
  });
}

/* reset background */

reset.onclick = function() {
  getActiveTab().then((tabs) => {
    browser.tabs.sendMessage(tabs[0].id, {reset: true});

    cookieVal = { image : '',
                  color : '' };
    browser.cookies.remove({
      url: tabs[0].url,
      name: "bgpicker" 
    })
  });
}

/* Report cookie changes to the console */

browser.cookies.onChanged.addListener((changeInfo) => {
  console.log(`Cookie changed:\n
              * Cookie: ${JSON.stringify(changeInfo.cookie)}\n
              * Cause: ${changeInfo.cause}\n
              * Removed: ${changeInfo.removed}`);
});
