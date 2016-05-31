
The "webextensions-examples" repository is a collection of simple but complete
and installable
[WebExtensions](https://developer.mozilla.org/en-US/Add-ons/WebExtensions).

We're really happy to accept contributions, either as new examples or as
improvements to the existing examples. This file lists some general guidelines
to help contributors write useful examples.

## Types of contribution

There are many ways you can help improve this repository! For example:

* **write a brand-new example:** for example, you might notice that there are no
examples highlighting the [cookies API](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/cookies).
* **extend an existing example:** for example,
you might notice that the [tabs-tabs-tabs](https://github.com/mdn/webextensions-examples/tree/master/tabs-tabs-tabs) example
uses a lot of tab manipulation APIs, but does not cover
[tabs.setZoom()](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/setZoom).
* **fix a bug:** we have a list of [issues](https://github.com/mdn/webextensions-examples/issues),
or maybe you found your own.
* **contribute a translation:** find an example with a `_locales` directory in
it, and create a translation of the example's localizable strings into a new language. 

## Guidelines for examples

Examples should:

* have a clear function, that's easy to explain and understand
* focus on demonstrating how to use the WebExtension technology, minimizing any
complex logic that's extraneous to the WebExtension technology itself
* demonstrate good-practice use of the technology, even at the expense of extra
complexity
* include useful optional manifest.json keys:
    * [`description`](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/manifest.json/description)
    * [`icons`](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/manifest.json/icons)
    * `homepage_url`
    * [`strict_min_version` in the `applications` key](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/manifest.json/applications)

Finally, note that the examples are all made available under the
[Mozilla Public License 2.0](https://github.com/mdn/webextensions-examples/blob/master/LICENSE),
so any contributions must be
[compatible with that license](https://www.mozilla.org/en-US/MPL/license-policy/).
If you're not sure about that, just ask.

## Getting help

If you need help with writing a WebExtension, email the [dev-addons mailing list](https://mail.mozilla.org/listinfo/dev-addons) or contact the
WebExtensions team in the #webextensions IRC channel on irc.mozilla.org.
