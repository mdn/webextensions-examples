# dnr-block-only

Demonstrates how to block network requests without host permissions through the
declarativeNetRequest API with the `declarative_net_request` manifest key.",

## What it does

This extension blocks network requests:

- requests to URLs containing "blocksub" (except for top-level navigations).
- top-level navigation to URLs containing "blocktop".
- all requests containing "blockall".

`testpage.html` can be loaded to see the extension in action.
This demo page does not need to be packaged with the extension.

# What it shows

- how to use the declarativeNetRequest API through the `declarative_net_request` manifest key.
- how to use the "resourceTypes" and "excludedResourceTypes" condition of a declarativeNetRequest rule.
- how to block network requests without host permissions, but instead through the "declarativeNetRequest" permission that triggers the "Block content on any page" permission warning at install time.

This is the only cross-browser way to block network requests (at least in
Firefox, Chrome and Safari). While the extension uses `"manifest_version": 3`,
it also works identically with `"manifest_version": 2`.
