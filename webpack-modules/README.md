# WebExtension Webpack Example
A minimal example of how to use npm modules from within a WebExtension.
The example package used by this extension is `left-pad`, an essential package
in almost any situation.

## What it does
This setup takes a background and a content script entrypoint and outputs them
to their respective target.

## What it could do
This could be infinitely extended - injecting global jQuery, adding babel,
react/jsx, css modules, image processing and so on.

## What it shows

 - How to use npm or custom modules in a WebExtension.

## How to build it

 - `npm install`
 - `npm run build`

The WebExtension in the [dist](dist/) folder should now work.

## What about Browserify?
Browserify works just as well as webpack for extensions, in the end it's a
personal choice about your prefered tool.

## Live-development
Additionally to watching the folder with your `manifest.json` in it, you will also
have to run webpack in watch mode.
