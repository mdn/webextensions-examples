# WebExtension Webpack Example
A minimal example of how to use [webpack](https://webpack.github.io) to package
[npm](https://npmjs.com) modules so they can be used in a WebExtension.
The example package used by this extension is `left-pad`, an essential package
in almost any situation.

## What it does
This example shows how to use a node module in a background and a content script.
It defines two build targets in [webpack.config.js](webpack.config.js), they each
generate a file that includes all modules used the entry point and store it in
the [addon](addon/) folder. The first one starts with [background_scripts/background.js](background_scripts/background.js)
and stores it in `addon/background_scripts/index.js`. The other one does the
same for [popup/left-pad.js](popup/left-pad.js) and stores it in `addon/popup/index.js`.

The extension includes a browser action with a popup, which provides an UI for
running left-pad on a string with a chosen character. The operation can either be
performed with the left-pad module included in the panel's script or in the
background script.

## What it could do
This could be infinitely extended - injecting global jQuery, adding babel,
react/jsx, css modules, image processing, local modules and so on.

## What it shows

 - How to use npm or custom modules in a WebExtension.

## How to build it

 - `npm install`
 - `npm run build`

The WebExtension in the [addon](addon/) folder should now work.

## What about Browserify?
Browserify works just as well as webpack for extensions, in the end it's a
personal choice about your prefered tool.

## Live-development
Additionally to watching the folder with your `manifest.json` in it, you will also
have to run webpack in watch mode.
