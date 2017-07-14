# webextensions-examples [![Build Status](https://travis-ci.org/mdn/webextensions-examples.svg?branch=master)](https://travis-ci.org/mdn/webextensions-examples)

[https://github.com/mdn/webextensions-examples](https://github.com/mdn/webextensions-examples)

Maintained by the [MDN team at Mozilla](https://wiki.mozilla.org/MDN).

WebExtensions are a way to write browser extensions: that is, programs
installed inside a web browser that modify the behaviour of the browser or
of web pages loaded by the browser. They are built on a set of
cross-browser APIs, so WebExtensions written for Google Chrome or Opera will
in most cases run in Firefox or Edge too.

The "webextensions-examples" repository is a collection of simple but complete
and installable WebExtensions. You can use the examples to see how to use the
WebExtensions APIs, and as a starting point for your own WebExtensions.

The examples are made available under the
[Mozilla Public License 2.0](https://www.mozilla.org/en-US/MPL/2.0/).

## How to use "webextensions-examples"

To use the repository, first clone it.

Each example is in its own top-level directory. Install an example in your
favourite web browser ([installation instructions](#installing-an-example) are below),
and see how it works. Each example has its own short README explaining what
it does.

To find your way around a WebExtension's internal structure, have a look at the
[Anatomy of a WebExtension](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Anatomy_of_a_WebExtension)
page on MDN.

To use these examples in Firefox, you should use the most recent release
of Firefox. Some examples work with earlier releases.

A few examples rely on APIs that are currently only available in pre-release
versions of Firefox. Where this is the case, the example should declare
the minimum version that it needs in the `strict_min_version` part of the
[applications key](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/manifest.json/applications)
in its manifest.json file.

## Installing an example

There are a couple ways to try out the example extensions in this repository.

1. Open Firefox and load `about:debugging` in the URL bar. Click the
   [Load Temporary Add-on](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Temporary_Installation_in_Firefox)
   button and select the `manifest.json` file within the
   directory of an example extension you'd like to install.
   Here is a [video](https://www.youtube.com/watch?v=cer9EUKegG4)
   that demonstrates how to do this.
2. Install the
   [web-ext](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Getting_started_with_web-ext)
   tool, change into the directory of the example extension
   you'd like to install, and type `web-ext run`. This will launch Firefox and
   install the extension automatically. This tool gives you some
   additional development features such as
   [automatic reloading](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Getting_started_with_web-ext#Automatic_extension_reloading).

## Index of examples

<dl><dt><a href="https://github.com/mdn/webextensions-examples/tree/master/annotate-page">annotate-page</a></dt>
<dd>Sidebar demo.</dd>
</dl>

<dl><dt><a href="https://github.com/mdn/webextensions-examples/tree/master/apply-css">apply-css</a></dt>
<dd>Inserts CSS into a web page.</dd>
</dl>

<dl><dt><a href="https://github.com/mdn/webextensions-examples/tree/master/beastify">beastify</a></dt>
<dd>Adds a browser action with a popup and injects a script into a web page.</dd>
</dl>

<dl><dt><a href="https://github.com/mdn/webextensions-examples/tree/master/bookmark-it">bookmark-it</a></dt>
<dd>Adds and removes bookmarks.</dd>
</dl>

<dl><dt><a href="https://github.com/mdn/webextensions-examples/tree/master/borderify">borderify</a></dt>
<dd>Injects scripts into pages that match a URL pattern.</dd>
</dl>

<dl><dt><a href="https://github.com/mdn/webextensions-examples/tree/master/chill-out">chill-out</a></dt>
<dd>Page action demo, plus some features of <code>alarms</code> and <code>tabs</code>.</dd>
</dl>

<dl><dt><a href="https://github.com/mdn/webextensions-examples/tree/master/commands">commands</a></dt>
<dd>Defines keyboard shortcuts.</dd>
</dl>

<dl><dt><a href="https://github.com/mdn/webextensions-examples/tree/master/context-menu-copy-link-with-types">context-menu-copy-link-with-types</a></dt>
<dd>Advanced clipboard interaction, including copy to clipboard from a background page.</dd>
</dl>

<dl><dt><a href="https://github.com/mdn/webextensions-examples/tree/master/context-menu-demo">context-menu-demo</a></dt>
<dd>Adds items to the context menu.</dd>
</dl>

<dl><dt><a href="https://github.com/mdn/webextensions-examples/tree/master/contextual-identities">contextual-identities</a></dt>
<dd>Contextual identities (containers) demo.</dd>
</dl>

<dl><dt><a href="https://github.com/mdn/webextensions-examples/tree/master/cookie-bg-picker">cookie-bg-picker</a></dt>
<dd>Demo using cookies, browser actions with popups, and content scripts.</dd>
</dl>

<dl><dt><a href="https://github.com/mdn/webextensions-examples/tree/master/embedded-webextension-bootstrapped">embedded-webextension-bootstrapped</a></dt>
<dd>An embedded WebExtension in a bootstrapped Firefox add-on.</dd>
</dl>

<dl><dt><a href="https://github.com/mdn/webextensions-examples/tree/master/embedded-webextension-sdk">embedded-webextension-sdk</a></dt>
<dd>An embedded WebExtension in an Add-on SDK Firefox add-on.</dd>
</dl>

<dl><dt><a href="https://github.com/mdn/webextensions-examples/tree/master/emoji-substitution">emoji-substitution</a></dt>
<dd>Injects content scripts into web pages matching a given URL pattern.</dd>
</dl>

<dl><dt><a href="https://github.com/mdn/webextensions-examples/tree/master/eslint-example">eslint-example</a></dt>
<dd>How to configure a WebExtension with eslint.</dd>
</dl>

<dl><dt><a href="https://github.com/mdn/webextensions-examples/tree/master/favourite-colour">favourite-colour</a></dt>
<dd>Demo of storage and options(settings) pages.</dd>
</dl>

<dl><dt><a href="https://github.com/mdn/webextensions-examples/tree/master/firefox-code-search">firefox-code-search</a></dt>
<dd>Customizes the behavior of the browser's address bar.</dd>
</dl>

<dl><dt><a href="https://github.com/mdn/webextensions-examples/tree/master/forget-it">forget-it</a></dt>
<dd>Clears stored browsing data.</dd>
</dl>

<dl><dt><a href="https://github.com/mdn/webextensions-examples/tree/master/google-userinfo">google-userinfo</a></dt>
<dd>Authenticates the user with Google.</dd>
</dl>

<dl><dt><a href="https://github.com/mdn/webextensions-examples/tree/master/history-deleter">history-deleter</a></dt>
<dd>Clears browsing history entries by domain.</dd>
</dl>

<dl><dt><a href="https://github.com/mdn/webextensions-examples/tree/master/latest-download">latest-download</a></dt>
<dd>Displays the most recently downloaded item.</dd>
</dl>

<dl><dt><a href="https://github.com/mdn/webextensions-examples/tree/master/list-cookies">list-cookies</a></dt>
<dd>Lists all cookies in the active tab.</dd>
</dl>

<dl><dt><a href="https://github.com/mdn/webextensions-examples/tree/master/mocha-client-tests">mocha-client-tests</a></dt>
<dd>Tests the add-on using Mocha.</dd>
</dl>

<dl><dt><a href="https://github.com/mdn/webextensions-examples/tree/master/native-messaging">native-messaging</a></dt>
<dd>Exchanges messages between the add-on and a Python program installed on the user's computer.</dd>
</dl>

<dl><dt><a href="https://github.com/mdn/webextensions-examples/tree/master/navigation-stats">navigation-stats</a></dt>
<dd>Collects and displays statistics for sites the user navigates to.</dd>
</dl>

<dl><dt><a href="https://github.com/mdn/webextensions-examples/tree/master/notify-link-clicks-i18n">notify-link-clicks-i18n</a></dt>
<dd>Displays localized notifications when the user clicks on links.</dd>
</dl>

<dl><dt><a href="https://github.com/mdn/webextensions-examples/tree/master/open-my-page-button">open-my-page-button</a></dt>
<dd>Opens a page bundled with the add-on, when the user clicks a toolbar button.</dd>
</dl>

<dl><dt><a href="https://github.com/mdn/webextensions-examples/tree/master/page-to-extension-messaging">page-to-extension-messaging</a></dt>
<dd>Exchanges messages between a web page and the add-on.</dd>
</dl>

<dl><dt><a href="https://github.com/mdn/webextensions-examples/tree/master/permissions">permissions</a></dt>
<dd>Demo showing how to ask the user for additional permissions at runtime.</dd>
</dl>

<dl><dt><a href="https://github.com/mdn/webextensions-examples/tree/master/quicknote">quicknote</a></dt>
<dd>Note-taking add-on: shows how to store data, and how to use browser actions and popups.</dd>
</dl>

<dl><dt><a href="https://github.com/mdn/webextensions-examples/tree/master/react-es6-popup">react-es6-popup</a></dt>
<dd>How to use React and ES6 in an add-on.</dd>
</dl>

<dl><dt><a href="https://github.com/mdn/webextensions-examples/tree/master/selection-to-clipboard">selection-to-clipboard</a></dt>
<dd>Basic clipboard example: copying to the clipboard in a content script.</dd>
</dl>

<dl><dt><a href="https://github.com/mdn/webextensions-examples/tree/master/stored-credentials">stored-credentials</a></dt>
<dd>Performs HTTP basic authentication using a stored username and password.</dd>
</dl>

<dl><dt><a href="https://github.com/mdn/webextensions-examples/tree/master/tabs-tabs-tabs">tabs-tabs-tabs</a></dt>
<dd>Demo of various <code>tabs</code> functions: open, close, move, etc.</dd>
</dl>

<dl><dt><a href="https://github.com/mdn/webextensions-examples/tree/master/top-sites">top-sites</a></dt>
<dd>Replaces the "new tab" page with links to pages that the user often visits.</dd>
</dl>

<dl><dt><a href="https://github.com/mdn/webextensions-examples/tree/master/user-agent-rewriter">user-agent-rewriter</a></dt>
<dd>Intercepts and modifies HTTP requests.</dd>
</dl>

<dl><dt><a href="https://github.com/mdn/webextensions-examples/tree/master/webpack-modules">webpack-modules</a></dt>
<dd>Uses webpack to package npm modules for use in an add-on.</dd>
</dl>

<dl><dt><a href="https://github.com/mdn/webextensions-examples/tree/master/window-manipulator">window-manipulator</a></dt>
<dd>Demo of various <code>windows</code> functions: create, close, resize, etc.</dd>
</dl>

## Learn more

To learn more about developing WebExtensions, see the
[WebExtensions documentation on MDN](https://developer.mozilla.org/en-US/Add-ons/WebExtensions)
for getting started guides, tutorials, and full API reference docs.

## Problems?

If you find a problem, please [file a bug](https://github.com/mdn/webextensions-examples/issues/new).

If you need help, email the [dev-addons mailing list](https://mail.mozilla.org/listinfo/dev-addons) or contact the WebExtensions team in the #webextensions IRC channel on irc.mozilla.org.

## Contributing

We welcome contributions, whether they are whole new examples, new features,
bug fixes, or translations of localizable strings into new languages. Please
see the [CONTRIBUTING.md](https://github.com/mdn/webextensions-examples/blob/master/CONTRIBUTING.md) file for more details.
