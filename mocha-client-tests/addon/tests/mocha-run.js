mocha.checkLeaks();
// Here we add initial global variables to prevent this error:
// Error: global leaks detected: AppView, ExtensionOptions, ExtensionView, WebView
mocha.globals(['AppView', 'ExtensionOptions', 'ExtensionView', 'WebView']);
mocha.run();