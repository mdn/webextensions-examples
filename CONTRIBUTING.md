
The "webextensions-examples" repository is a collection of simple but complete
and installable
[WebExtensions](https://developer.mozilla.org/en-US/Add-ons/WebExtensions).

We're really happy to accept contributions, either as new examples or as
improvements to the existing examples. This file lists some general guidelines
to help contributors write useful examples.

## Types of contribution

There are many ways you can help improve this repository! For example:

* **write a brand-new example:** for example, you might notice that there are no
examples highlighting a particular [API](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API).
* **extend an existing example:** for example,
you might notice that an existing example could usefully be extended to demonstrate some extra APIs or techniques.
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
* omit the [`applications` key](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/manifest.json/applications), unless either of the following apply:
    * the example uses an API or other feature that's not yet available in the current released version of Firefox. In this case, include the `applications` key and set `strict_min_version` to the minimum required version of Firefox.
    * the example needs an explicitly specified ID (for example, [native messaging](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Native_messaging) requires an explicitly specified ID). In this case, include the `applications` key and set `id` appropriately.

## Code style

If you're editing an existing file, code style should be consistent with the rest of the code in the file. Otherwise, code style should follow the style for WebExtensions code itself: [https://wiki.mozilla.org/WebExtensions/Hacking#Code_Style](https://wiki.mozilla.org/WebExtensions/Hacking#Code_Style).

## Licensing

Please note that the examples are all made available under the
[Mozilla Public License 2.0](https://github.com/mdn/webextensions-examples/blob/master/LICENSE),
so any contributions must be
[compatible with that license](https://www.mozilla.org/en-US/MPL/license-policy/).
If you're not sure about that, just ask.

## Getting help

If you need help with writing a WebExtension, email the [dev-addons mailing list](https://mail.mozilla.org/listinfo/dev-addons) or contact the
WebExtensions team in the #webextensions IRC channel on irc.mozilla.org.
