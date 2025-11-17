# borderify

This add-on injects JavaScript into selected web pages.

## What it does

This extension includes a content script, "borderify.js", that is injected into any pages
under "mozilla.org/" or any of its subdomains.

**The `addons.mozilla.org` domain doesn't allow scripts to be injected into its pages. Therefore, this extension doesn't work on pages in the `addons.mozilla.org` domain.**

The content script draws a border around the document.body.

## What it shows

From this example, you see how to inject content scripts declaratively using manifest.json.
