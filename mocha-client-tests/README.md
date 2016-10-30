#Mocha client tests for WebExtensions
##Install dependency
`npm install` and `bower install` 

##Run with web-ext cli
If you have it already run `npm run web-ext` if not `npm i web-ext -g` and then first command (will work with FF dev edition), if you have error with web-ext cli please add path for FF binary file with `--firefox-binary /path/to/firefox-bin`
[web-ext docs](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/web-ext_command_reference)
##PhantomJs tests
`npm run test` will run simple test  `./addon/background.js`
## Mocha browser test
Already inside of addon 