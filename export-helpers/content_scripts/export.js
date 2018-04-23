
/**
 * Define a function in the content script's scope, then export it
 * into the page script's scope.
 */
function notify(message) {
  browser.runtime.sendMessage({content: "Function call: " + message});
}

exportFunction(notify, window, {defineAs:'notify'});

/**
 * Create an object that contains functions in the content script's scope,
 * then clone it into the page script's scope.
 *
 * Because the object contains functions, the cloneInto call must include
 * the `cloneFunctions` option.
 */
var messenger = {
  notify: function(message) {
    browser.runtime.sendMessage({content: "Object method call: " + message});
  }
};

window.wrappedJSObject.messenger = cloneInto(messenger, window, {cloneFunctions: true});
