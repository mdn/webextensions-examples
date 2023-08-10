
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
* omit the [`browser_specific_settings` key](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/manifest.json/browser_specific_settings), unless either of the following apply:
    * the example uses an API or other feature that's not yet available in the current released version of Firefox. In this case, include the `browser_specific_settings` key and set `strict_min_version` to the minimum required version of Firefox.
    * the example needs an explicitly specified ID (for example, [native messaging](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Native_messaging) requires an explicitly specified ID). In this case, include the `browser_specific_settings` key and set `id` appropriately.

## Code style

If you're editing an existing file, code style should be consistent with the rest of the code in the file. Otherwise, code style should follow the style for WebExtensions code itself: [https://wiki.mozilla.org/WebExtensions/Hacking#Code_Style](https://wiki.mozilla.org/WebExtensions/Hacking#Code_Style).

## Updating examples.json

**Note: people contributing examples don't have to update examples.json: this can be left up to the project maintainers. The documentation in this section is primarily aimed at maintainers, not contributors.**

This repository contains a JSON file at the root called "examples.json". It contains a machine-readable description of the examples the repository contains. For each example, the JSON file contains:

* the name of the example
* the description of the example
* a list of all the WebExtension APIs called by the example

This file is used to generate links from MDN pages to examples. Specifically, it's read by 2 different [KumaScript](https://github.com/mdn/kumascript) macros:

* [WebExtExamples](https://github.com/mdn/kumascript/blob/master/macros/WebExtExamples.ejs): this macro adds links to all examples that call a particular API, and is used to provide contextual links to example extensions. For example: https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/query#Example_extensions.

* [WebExtAllExamples](https://github.com/mdn/kumascript/blob/master/macros/WebExtAllExamples.ejs): this macro generates a complete list of all example extensions, and is used here: https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Examples

If you add a new example extension, or update an existing one to change the WebExtension APIs that it calls, you should update examples.json.

Also, it would be helpful to force https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Examples and any other relevant pages to re-evaluate their KumaScript, so they can pick up the changes. To do this, shift-refresh the page while logged into MDN.

## Licensing

Please note that the examples are all made available under the
[Mozilla Public License 2.0](https://github.com/mdn/webextensions-examples/blob/master/LICENSE),
so any contributions must be
[compatible with that license](https://www.mozilla.org/en-US/MPL/license-policy/).
If you're not sure about that, just ask.

## Getting help

If you need help with writing a WebExtension, please post on our [add-ons community forum](https://discourse.mozilla.org/c/add-ons/development/) or ask in the [Add-ons channel](https://chat.mozilla.org/#/room/#addons:mozilla.org) on [Mozilla's Matrix instance](https://wiki.mozilla.org/Matrix). 
