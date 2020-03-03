# webextensions-examples [![Build Status](https://travis-ci.org/mdn/webextensions-examples.svg?branch=master)](https://travis-ci.org/mdn/webextensions-examples)

[https://github.com/mdn/webextensions-examples](https://github.com/mdn/webextensions-examples)

Maintained by the [MDN team at Mozilla](https://wiki.mozilla.org/MDN).

WebExtensions are a way to write browser extensions: that is, programs
installed inside a web browser that modify the behavior of the browser or
web pages loaded by the browser. WebExtensions are built on a set of
cross-browser APIs, so WebExtensions written for Google Chrome, Opera, or 
Edge will, in most cases, run in Firefox too.

The "webextensions-examples" repository is a collection of simple, 
complete, and installable WebExtensions. The examples show how to use the
WebExtensions APIs, and you can use them as a starting point for your 
WebExtensions.

For an index of all the examples, see the ["Example extensions" page on MDN](https://developer.mozilla.org/Add-ons/WebExtensions/Examples).

The examples are made available under the
[Mozilla Public License 2.0](https://www.mozilla.org/en-US/MPL/2.0/).

## How to use "webextensions-examples"

To use the repository, first clone it.

Each example is in a top-level folder and includes a short README explaining
what it does. To see how an example works, install it in Firefox by following 
the [installation instructions](#installing-an-example). 

To find your way around a WebExtension's internal structure, have a look at the
[Anatomy of a WebExtension](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Anatomy_of_a_WebExtension)
page on MDN.

To use these examples in Firefox, use the most recent release of Firefox.
However, most examples work with earlier releases.

A few examples rely on APIs that are only available in pre-release versions 
of Firefox. Where this is the case, the example declares the minimum version
that it needs in the `strict_min_version` attribute of the
[`browser_specific_settings key`](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/manifest.json/browser_specific_settings)
in the extension's manifest.json file.

## Installing an example

Some examples work only on specific domains or pages. Details of any 
restrictions are provided in each example's README file. None of the 
examples work in private browsing windows by default, see 
[Extensions in Private Browsing](https://support.mozilla.org/en-US/kb/extensions-private-browsing#w_enabling-or-disabling-extensions-in-private-windows) 
for details.

To run an example extension:

1. Open Firefox and load the `about:debugging` page. Click 
   [Load Temporary Add-on](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Temporary_Installation_in_Firefox)
   and select the `manifest.json` file within the folder of an example extension.
   Here is a [video](https://www.youtube.com/watch?v=cer9EUKegG4)
   that demonstrates how to do this.
2. Install the
   [web-ext](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Getting_started_with_web-ext)
   tool. At the command line, open the example extension's folder and type
   `web-ext run`. This launches Firefox and installs the extension automatically.
   This tool provides some additional development features, such as
   [automatic reloading](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Getting_started_with_web-ext#Automatic_extension_reloading).

## Support for other browsers

These examples are tested in Firefox. They may work in other browsers, if the
[browser supports the APIs used](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Browser_support_for_JavaScript_APIs).
Note that these examples all use the `browser` namespace and promises to 
work with asynchronous functions. This means the examples won't work in 
Chrome unless you use the 
[polyfill provided by Mozilla](https://github.com/mozilla/webextension-polyfill).
See [the overview of WebExtension APIs](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API) 
for more information.

## Learn more

To learn more about developing WebExtensions, see the
[WebExtensions documentation on MDN](https://developer.mozilla.org/en-US/Add-ons/WebExtensions)
for getting started guides, tutorials, and full API reference docs.

## Problems?

If you encounter an issue:
- post a query on the [add-ons discourse forum](https://discourse.mozilla.org/c/add-ons)
- email the [dev-addons mailing list](https://mail.mozilla.org/listinfo/dev-addons)
- contact the add-ons team in the [Add-ons room](https://chat.mozilla.org/#/room/#addons:mozilla.org) on [Matrix](https://wiki.mozilla.org/Matrix)

If you cannot resolve the issue, [file a bug](https://github.com/mdn/webextensions-examples/issues/new).

## Contributing

We welcome contributions, whether they are new examples, new features, bug 
fixes, or translations of localizable strings. Please see the 
[CONTRIBUTING.md](https://github.com/mdn/webextensions-examples/blob/master/CONTRIBUTING.md)
file for more details.
