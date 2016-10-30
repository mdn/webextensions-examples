/**
 * Created by hmelenok on 10/30/16.
 */
mocha.checkLeaks();
mocha.globals(['jQuery','AppView', 'ExtensionOptions', 'ExtensionView', 'WebView']);
mocha.run();