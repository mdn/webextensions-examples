# inpage-toolbar-ui

## What it does ##

The extension includes:

* a browser action which enables/disables the in-page toolbar
* a content script which creates/removes the in-page toolbar iframe
* the toolbar ui resources, packaged as web accessible resources

When the user clicks the browser action button, a toolbar is shown/hidden
in the current web page.

The toolbar UI is packaged in the add-on resources, exposed to the current
web page as a web accessible resource and injected into the page by the
content script by creating and injecting into the page an iframe which
points to the toolbar UI page.

## What it shows ##

How to expose an in-page toolbar UI by creating an iframe:

* use web accessible resources to enable web pages to load packaged content
* use a content script to create and inject in a web page an iframe which points to the
  packaged content
* use the same API enabled in content scripts (but from the add-on iframe)
  to exchange messages directly with the add-on background page
