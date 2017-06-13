var currentTheme = '';

function setSun() {
  if (currentTheme === 'sun') {
    return;
  }
  currentTheme = 'sun';
  browser.theme.update({
    images: {
      headerURL: 'sun.jpg',
    },
    colors: {
      accentcolor: '#CF723F',
      textcolor: '#111',
    }
  });
}

function setMoon() {
  if (currentTheme === 'moon') {
    return;
  }
  currentTheme = 'moon';
  browser.theme.update({
    images: {
      headerURL: 'moon.jpg',
    },
    colors: {
      accentcolor: '#000',
      textcolor: '#fff',
    }
  });
}

function checkTime() {
  let date = new Date();
  let hours = date.getHours();
  // Will set the sun theme between 8am and 8pm.
  if ((hours > 8) && (hours < 20)) {
    setSun();
  } else {
    setMoon();
  }
}

// On start up, check the time to see what theme to show.
checkTime();

// Set up an alarm to check this regularly.
browser.alarms.create('checkTime', {periodInMinutes: 5});
