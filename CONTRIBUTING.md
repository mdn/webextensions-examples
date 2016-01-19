This repository contains example Firefox [WebExtensions](https://developer.mozilla.org/en-US/Add-ons/WebExtensions).

We're really happy to accept contributions, either as new examples or as
improvements to the existing examples. This file lists some general guidelines
to help contributors write useful examples.

The examples are intended to demonstrate how to use the WebExtensions technology,
particularly [APIs](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API),
but also [manifest.json keys](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/manifest.json)
and more general techniques such as internationalization or message passing.

More specifically, they're intended to be referenced from the MDN documentation
for WebExtensions. So, for example, we'll expect the reference page for
`tabs.executeScript()` to link to some examples that demonstrate how to use this
API.

So examples should:

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
