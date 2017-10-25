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

For an index of all the examples, see the ["Example extensions" page on MDN](https://developer.mozilla.org/Add-ons/WebExtensions/Examples).

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
