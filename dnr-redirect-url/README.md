# dnr-redirect-url

Demonstrates multiple ways to redirect requests using the declarativeNetRequest
API through the `declarative_net_request` manifest key. Demonstrates aspects of
Manifest Version 3 (MV3): action, host_permissions, web_accessible_resources.

## What it does

This extension redirects requests from the example.com domain to other destinations:

- example.com/ to `redirectTarget.html` packaged with the extension.
- example.com/ew to extensionworkshop.com
- https://www.example.com/[anything] to the same URL but the domain changed to example.com and `?redirected_from_www=1` appended to the URL.
- URLs matching regular expression `^https?://([^?]+)$` to the same URL but with scheme changed to https and `?redirected_by_regex` appended.

Redirecting requires host permissions for the pre-redirect URLs. Manifest V3 extensions do not have access to these by default.
The permission to these can be granted from the extension action popup.

# What it shows

- how to use the declarativeNetRequest API through the `declarative_net_request` manifest key.
- using the `permissions.contains` API to check whether an extension is granted host permissions.
- using the `permissions.request` API to request host permissions, from the `action` popup panel.
- how to redirect requests to a another website.
- how to redirect requests to a page packaged with the extension, and also listed in `web_accessible_resources`.
- how to redirect requests and transform the URL with the `transform` and `queryTransform` options.
- how to redirect a URL matched by a regular expression in `regexFilter` and a generated redirect target in `regexSubstitution`.
- how to use "priority" to specify the highest-priority rule that should match when multiple rule conditions are matched for a given request.
- manifest.json specifies the "declarativeNetRequestWithHostAccess" permission,
  which does not have a separate permission warning. In contrast, the
  "declarativeNetRequest" permission has the same effect, but has the "Block
  content on any page" permission warning.

## Comparison with Manifest Version 2

While this example uses `"manifest_version": 3`, the functionality is not
specific to Manifest Version 3.

To create a MV2 version of the extension, modify `manifest.json` as follows:

- Set `manifest_version` to 2.
- Rename `host_permissions` to `optional_permissions`.
- Rename `action` to `browser_action`.
- Set `web_accessible_resources` to `["redirectTarget.html"]`

As an alternative to renaming `host_permissions` to `optional_permissions`,
add the match patterns in the `host_permissions` array to the existing
`permissions` key of the MV2 manifest. Then the user does not need to opt in to
the host permission, and the extension immediately works after installation.
