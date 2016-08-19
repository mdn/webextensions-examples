# export-helpers

## What it does

This extension demonstrates how to use export helpers in Firefox to share
JavaScript objects defined in content scripts with scripts loaded by web pages.

It has a background script that does two things:

* execute a content script in the current tab, when the user clicks a browser action
* listen for messages from the content script, and display a notification when the message arrives.
 
The content script then:
 
 * defines a function `notify()` and exports that to the page as a property
 of the global `window` object.
 * defines an object `messenger`, that has a member function `notify()`, and
 exports that to the page as a property of the global `window` object.
 * creates an object `messenger2` directly in the page's scope
 as a property of the global `window` object, then
 exports a function `notify()` as a member of that object.
 
All that means that after clicking the browser action, any scripts loaded by
the current page will be able to do things like this:
 
     window.notify("Message from the page script!");
     window.messenger.notify("Message from the page script!");
     window.messenger2.notify("Message from the page script!");
