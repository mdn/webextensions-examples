# dnr-block-only

Demonstrates how to block network requests without host permissions using the
declarativeNetRequest API with the `declarative_net_request` manifest key.

## What it does

This extension blocks:

- network requests to URLs containing "blocksub" (except for top-level navigations).
- top-level navigation to URLs containing "blocktop".
- all requests containing "blockall".

Load `testpage.html` to see the extension in action.
This demo page does not need to be packaged with the extension.

# What it shows

This example shows how to:

- use the declarativeNetRequest API through the `declarative_net_request` manifest key.
- use the "resourceTypes" and "excludedResourceTypes" conditions of a declarativeNetRequest rule.
- block network requests without host permissions using the "declarativeNetRequest" permission, which triggers the "Block content on any page" permission warning at install time.

This is the only cross-browser way to block network requests (at least in
Firefox, Chrome, and Safari). While the extension uses `"manifest_version": 3`,
it also works identically with `"manifest_version": 2`.
