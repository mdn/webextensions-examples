# dnr-dynamic-with-options

Demonstrates a generic way to request host permissions and register
declarativeNetRequest rules to modify network requests, without any
install-time permission warnings. The `options_ui` page offers a way to request
permissions and register declarative net request (DNR) rules.

## What it does

After loading the extension, visit the extension options page:

1. Visit `about:addons`.
2. Go to the extension at "DNR Dynamic with options".
3. Click on Preferences to view its options page (options.html).

On the options page:

1. Input the list of host permissions and click on "Grant host permissions".
2. Input the list of declarativeNetRequest rules and click "Save".
3. Trigger a network request to verify that the rule matched.

### Example for options page

Host permissions:

```json
["*://example.com/"]
```

DNR rules:

```json
[
  {
    "id": 1,
    "priority": 1,
    "condition": {
      "urlFilter": "|https://example.com/",
      "resourceTypes": [
        "main_frame"
      ]
    },
    "action": {
      "type": "block"
    }
  }
]
```

Manual test case: Visit https://example.com/ and verify that it is blocked.

# What it shows

How to create an extension with no install-time permission warnings and 
request (host) permissions as needed:

- declares the "declarativeNetRequestWithHostAccess" permission, which
  unlocks the declarativeNetRequest API without install-time warning.
  In contrast, the "declarativeNetRequest" permission has the same effect,
  but has the "Block content on any page" permission warning.
- declares the most permissive match pattern in `optional_host_permissions`.
- calls `permissions.request` to request host permissions.
- uses `permissions.getAll` and `permissions.remove` to reset permissions.

How to retrieve and dynamically register declarativeNetRequest rules, using:

- `declarativeNetRequest.getDynamicRules` and
  `declarativeNetRequest.updateDynamicRules` to manage DNR rules that persist
  across extension restarts. These rules also persist across browser restarts,
  unless the extension is loaded temporarily or unloaded.
- `declarativeNetRequest.getSessionRules` and
  `declarativeNetRequest.updateSessionRules` to manage DNR rules that are
  session-scoped, that is, cleared when an extension unloads or the browser
  quits.

How these registered DNR rules can modify network requests without requiring an
active extension script in the background, in a cross-browser way (at least in
Firefox, Chrome, and Safari).

## Note on `optional_host_permissions` and `optional_permissions`

Firefox does not support `optional_host_permissions` permissions, it
supports host permissions in `optional_permissions`
(https://bugzilla.mozilla.org/show_bug.cgi?id=1766026).

Chrome recognizes `optional_host_permissions` but does not support host
permissions in `optional_permissions`.

To support both, include `optional_host_permissions` and `optional_permissions`
in your manifest.json.

## Comparison with Manifest Version 2

While this example uses `"manifest_version": 3`, the functionality is not
specific to Manifest Version 3.

To create a MV2 version of the extension, modify `manifest.json` as follows:

- Set `manifest_version` to 2.
- Use `optional_permissions` instead of `optional_host_permissions` to list
  optional host permissions.
  -  In this example, `optional_permissions` is present with
     the same value as `optional_host_permissions` for the reasons explained in
     the previous section. The latter is MV3-only and can be removed from a MV2
     manifest.

# Index of DNR examples

- [dnr-block-only](https://github.com/mdn/webextensions-examples/tree/main/dnr-block-only)
- [dnr-dynamic-with-options](https://github.com/mdn/webextensions-examples/tree/main/dnr-dynamic-with-options) (this example)
- [dnr-redirect-url](https://github.com/mdn/webextensions-examples/tree/main/dnr-redirect-url)
