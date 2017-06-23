# discogs-search

## What it does

This add-on adds a search engine to the browser, that sends the search term to the [discogs.com](https://discogs.com) website.

It also adds a keyword "disc", so you can type "disc Model 500" and get the discogs search engine without having to select it.

## What it shows

How to use the [`chrome_settings_overrides`](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/manifest.json/chrome_settings_overrides) manifest key to define a new search engine.

Note that Chrome mandates the `is_default` property, and `encoding` must also be included unless `prepopulated_id` is set. Since none of these properties are yet supported in Firefox, it's not possible to write a single manifest.json that works in both browsers. So this example includes three manifest*.json files:

* manifest-chrome.json: works in Chrome. Rename this to manifest.json to use Chrome.
* manifest-firefox.json: works in Firefox.
* manifest.json: the default. The same as manifest-firefox.json
