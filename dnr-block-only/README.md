# dnr-block-only

Demonstrates how to block network requests without host permissions using the
declarativeNetRequest API with the `declarative_net_request` manifest key.

## What it does

This extension blocks:

- network requests to URLs containing "blocksub" (except for top-level
  navigations).
- top-level navigation to URLs containing "blocktop".
- all requests containing "blockall".

Load `testpage.html` to see the extension in action.
This demo page does not need to be packaged with the extension.

# What it shows

This example shows how to:

- use the declarativeNetRequest API through the `declarative_net_request`
  manifest key.
- use the "resourceTypes" and "excludedResourceTypes" conditions of a
  declarativeNetRequest rule.
- block network requests without host permissions using the
  "declarativeNetRequest" permission, which triggers the "Block content on any
  page" permission warning at install time.

This example is the only cross-browser way to block network requests (at least
in Firefox, Chrome, and Safari). The webRequest API is an alternative way to
implement this functionality, but is only available in Firefox (MV2 and MV3)
and in Chrome (MV2 only). Safari does not support the webRequest API.

## Comparison with Manifest Version 2

While this example uses `"manifest_version": 3`, the functionality is not
specific to Manifest Version 3.

To create a MV2 version of the extension, modify `manifest.json` as follows:

- Set `manifest_version` to 2.

# Index of DNR examples

- [dnr-block-only](https://github.com/mdn/webextensions-examples/tree/main/dnr-block-only) (this example)
- [dnr-dynamic-with-options](https://github.com/mdn/webextensions-examples/tree/main/dnr-dynamic-with-options)
- [dnr-redirect-url](https://github.com/mdn/webextensions-examples/tree/main/dnr-redirect-url)
