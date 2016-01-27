# inpage-toolbar-ui

## What it does ##

The extension includes:

* a browser action which enable/disable the in-page toolbar
* a content script which creates/removes the in-page toolbar iframe
* the toolbar ui resources, packaged as web accessible resources

When the user clicks the browser action button, a toolbar is shown/hidden
in the current web page.

The toolbar UI is packaged in the add-on resources, exposed to the current
web page as web accessible resources and injected into the page by the
content script by creating and injecting into the page an iframe which
points to the toolbar UI page.

## What it shows ##

how to expose an in-page toolbar UI by creating an iframe:

* use web accessible resources to enable web pages to load packaged content
* use a content script to create and inject in a web page an iframe with points
* directly exchange add-on private data between the add-on iframe and the background page
  using the WebExtensions ports.
