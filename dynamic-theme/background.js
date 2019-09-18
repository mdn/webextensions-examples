/**********************************************************************
* Author(s): Andy McKay, Brian S. Wilson
* Purpose: A dynamic theme coding example to display a day and a night
*          theme based on the hour of the day.
**********************************************************************/

// Global Variables and Constants
var currentTheme = '';

const themes = {
  'day': {
    images: {
      headerURL: 'sun.jpg',
    },
    colors: {
      accentcolor: '#CF723F',
      textcolor: '#111',
    }
  },
  'night': {
    images: {
      headerURL: 'moon.jpg',
    },
    colors: {
      accentcolor: '#000',
      textcolor: '#fff',
    }
  }
};


// Functions

function setTheme(theme) {
  // Update the background theme...

  // ...if we need to.
  if (currentTheme !== theme) {
    currentTheme = theme;
    browser.theme.update(themes[theme]);
  }

  return;
}

function checkTime() {
  // Decide which theme to display based on the time (hour).

  let theme = 'night'; // Set default to night theme.
  let hour = new Date().getHours();

  // Use the day theme between 8 A.M. and 8 P.M.
  if ((hour => 8) && (hour < 20)) { theme = 'day'; }

  setTheme(theme);

  return;
}

// Main Logic

// Initialize: On start up, call checkTime() and set the initial theme
// then on the hour, run checkTime() to reset the theme (if necessary).
checkTime();
let minutes = new Date().getMinutes();
let milliseconds = (60-minutes)*60000;
setTimeout(checkTime, milliseconds);

// Set up an hourly recurring browser alarm to check if we need a new theme.
// Since we did the setTimeout() to wait until the top of the hour, all future
// checks should also occur near the top of the hour.
browser.alarms.onAlarm.addListener(checkTime);
browser.alarms.create('checkTime', {periodInMinutes: 60});
