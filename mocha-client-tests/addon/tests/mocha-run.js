mocha.checkLeaks();
mocha.globals(['jQuery','AppView', 'ExtensionOptions', 'ExtensionView', 'WebView']);
mocha.run();