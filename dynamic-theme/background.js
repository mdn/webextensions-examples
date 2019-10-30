var currentTheme = '';

const themes = {
  'day': {
    images: {
      theme_frame: 'sun.jpg',
    },
    colors: {
      frame: '#CF723F',
      tab_background_text: '#111',
    }
  },
  'night': {
    images: {
      theme_frame: 'moon.jpg',
    },
    colors: {
      frame: '#000',
      tab_background_text: '#fff',
    }
  }
};

function setTheme(theme) {
  if (currentTheme === theme) {
    // No point in changing the theme if it has already been set.
    return;
  }
  currentTheme = theme;
  browser.theme.update(themes[theme]);
}

function checkTime() {
  let date = new Date();
  let hours = date.getHours();
  // Will set the sun theme between 8am and 8pm.
  if ((hours > 8) && (hours < 20)) {
    setTheme('day');
  } else {
    setTheme('night');
  }
}

// On start up, check the time to see what theme to show.
checkTime();

// Set up an alarm to check this regularly.
browser.alarms.onAlarm.addListener(checkTime);
browser.alarms.create('checkTime', {periodInMinutes: 5});
