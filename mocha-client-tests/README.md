#Mocha client tests for WebExtensions
##Install dependency
`npm install` - will install all dependencies for running PhantomJS outside of addon

Than please run `cd ./addon/` and `npm install` to install mocha. It give you possibility to run client test inside of addon with mocha UI. If you don't want to have mocha UI you can install [WebConsole-reporter](https://github.com/eeroan/WebConsole-reporter)

##Run with web-ext cli
Just run `npm run web-ext` (will work with FF dev edition), if you have error with web-ext cli please add path for FF binary file with `--firefox-binary /path/to/firefox-bin`
[(web-ext docs)](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/web-ext_command_reference).

When addon will start click on mocha icon in your browser bar to run client tests: 

![addon screenshot](screenshots/addon-button.png "Mocha test addon")

Addon will run test of  `./addon/background.js` in `mocha-client-tests/addon/tests/lib/background-messaging.test.js`
##PhantomJs tests
`npm test` will run simple test of `./addon/background.js` in `./tests/lib/background.test.js`