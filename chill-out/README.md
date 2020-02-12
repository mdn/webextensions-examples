# chill-out

## What it does

After 6 seconds of inactivity (defined as the user not having navigated
or switched away from the active tab) display a
[page action](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/pageAction)
for that tab.

When the user clicks the page action, navigate to https://giphy.com/explore/cat.

The delay of 6 seconds is to make the extension's behavior obvious, but such a short
period is not recommended in practical applications. Note that in Chrome, alarms do not 
fire in under a minute. In Chrome:

* if you install this extension "unpacked", you'll see a warning
in the console, but the alarm will still go off after 6 seconds
* if you package the extension and install it, then the alarm will go off after
a minute.

## What it shows

How to:

* use various `tabs` functions.
* show and hide a page action.
* set alarms and handle alarms going off.
