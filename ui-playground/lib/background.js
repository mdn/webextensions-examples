/* globals chrome:false */

'use strict';

chrome.browserAction.setBadgeText({text: '🚲ᕕ( ᐛ)ᕗ'});
// chrome.browserAction.setBadgeBackgroundColor({color: '#FFF'});

var chillOut = function (aTab) {
  console.log("Chilling…");
  // chrome.tabs.query({'url': '*://chilloutandwatchsomecatgifs.com/*'}, (tabs) => {
  chrome.tabs.query({'url': 'http://chilloutandwatchsomecatgifs.com/'}, (tabs) => {
    if (tabs.length) {
      var tab = tabs.reduce((active, item) => {
        if (aTab && item.id === aTab.id) {
          active.push(item);
        }
        return active;
      }, []);
      if (tab.length === 0) {
        chrome.tabs.update(tabs[0].id, {'active': true});
        // chrome.pageAction.show(tabs[0].id);
      } else {
        // chrome.pageAction.show(tab[0].id);
      }
    } else {
      var url = 'http://chilloutandwatchsomecatgifs.com/';
      // var url = chrome.extension.getURL('catgifs.html') + '#blah:';
      chrome.tabs.create({'url': url, 'active': true}, (tab) => {
        console.log(tab);
        // chrome.pageAction.show(tab.id);
      });
    }
  });
};

var count = 0;

chrome.notifications.onClicked.addListener(function (notificationId) {
  // This doesn't work yet.
  console.log("Notification Clicked!!!", notificationId);
  chrome.tabs.query({active: true}, function (aTab) {
    chillOut(aTab);
  });
});

var audio = new Audio();
audio.onerror = function() {
  console.log("failed to load coin sound: " + audio.src);
  audio.src = '';
};
audio.src = chrome.extension.getURL('sounds/coin.mp3');
audio.load();

if (chrome.bookmarks && chrome.bookmarks.onCreated) {
  chrome.bookmarks.onCreated.addListener(function () {
    if (audio && audio.src) {
      if (!audio.paused) {
        if (audio.currentTime < 0.2) {
          return;
        }
        audio.pause();
        audio.currentTime = 0;
      }

      // Sometimes, when playing multiple times, readyState is HAVE_METADATA.
      if (audio.readyState === 0) {  // HAVE_NOTHING
        console.log('bad ready state: ' + audio.readyState);
      } else if (audio.error) {
        console.log('media error: ' + audio.error);
      } else {
        audio.play();
      }
    }
  });
}

chrome.alarms.onAlarm.addListener(function (alarm) {
  console.log("Alarm!!!", alarm, count);
  chrome.browserAction.setBadgeBackgroundColor({color: '#' + Math.floor(Math.random() * 255 * 255 * 255).toString(16)});
  count = (count + 1) % (Math.floor(Math.random() * 10) + 1);
  if (alarm.name === 'chillOut' && count === 0) {
    chrome.notifications.create('chillOut', {
      type: 'basic',
      iconUrl: 'icon64.png',
      title: 'Chill Out! ☕️ ✨ 🚲',
      message: '…and watch some cat gifs!\n ☕️ ✨ 🚲',
      contextMessage: 'yo. ☕️ ✨ 🚲',
      isClickable: true
    });
    chrome.tabs.query({active: true}, function (aTab) {
      chillOut(aTab);
    });
  }
});

chrome.alarms.create('chillOut', {periodInMinutes: 1});
if (chrome.pageAction) {
  chrome.pageAction.onClicked.addListener(function (aTab) {
    chillOut(aTab);
  });

  chrome.tabs.query({active: true}, tabs => {
    tabs.forEach(tab => {
      if (tab && tab.id) {
        chrome.pageAction.show(tab.id);
      }
    });
  });

  chrome.tabs.onActivated.addListener(activeInfo => {
    chrome.pageAction.show(activeInfo.tabId);
  });

}
