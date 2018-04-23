# chill-out

## What it does

After N seconds of inactivity (defined as the user not having navigated
or switched away from the active tab) display a
[page action](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/pageAction)
for that tab.

When the user clicks the page action,
navigate to http://chilloutandwatchsomecatgifs.com/.

"N" is set to 6 seconds in this example. Such a short period is chosen to make
the extension's behavior more obvious, but this is not recommended in real life.
Note that in Chrome, alarms cannot be set for less than a minute. In Chrome:

* if you install this extension "unpacked", you'll see a warning
in the console, but the alarm will still go off after 6 seconds
* if you package the extension and install it, then the alarm will go off after
a minute.

## What it shows

* how to use various `tabs` functions
* how to show/hide a page action
* how to set alarms and handle alarms going off
