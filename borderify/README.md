# borderify

**This add-on injects JavaScript into web pages. The `addons.mozilla.org` domain disallows this operation, so this add-on will not work properly when it's run on pages in the `addons.mozilla.org` domain.**

## What it does

This extension just includes:

* a content script, "borderify.js", that is injected into any pages
under "mozilla.org/" or any of its subdomains

The content script draws a border around the document.body.

## What it shows

* how to inject content scripts declaratively using manifest.json
