# dnr-redirect-url

Demonstrates multiple ways to redirect requests using the declarativeNetRequest
API through the `declarative_net_request` manifest key. Demonstrates aspects of
Manifest Version 3 (MV3): action, host_permissions, and web_accessible_resources.

## What it does

This extension redirects requests from the example.com domain to other destinations:

- example.com/ to `redirectTarget.html` packaged with the extension.
- example.com/ew to extensionworkshop.com
- https://www.example.com/[anything] to the same URL but the domain changed to example.com and `?redirected_from_www=1` appended to the URL.
- URLs matching regular expression `^https?://([^?]+)$` to the same URL but with scheme changed to https and `?redirected_by_regex` appended.

Redirecting requires host permissions for the pre-redirect URLs. Manifest V3 extensions do not have access to these by default.
The permission to these can be granted from the extension action popup.

# What it shows


This extension shows how to:

- use the declarativeNetRequest API through the `declarative_net_request` manifest key.
- use the `permissions.contains` API to check whether an extension is granted host permissions.
- use the `permissions.request` API to request host permissions from the `action` popup panel.
- redirect requests to another website.
- redirect requests to a page packaged in the extension and listed in `web_accessible_resources`.
- redirect requests and transform the URL with the `transform` and `queryTransform` options.
- redirect a URL matching a regular expression in `regexFilter` and generate a redirect target in `regexSubstitution`.
- use "priority" to specify the rule to action when multiple rule conditions are matched to a request.
- specify the "declarativeNetRequestWithHostAccess" permission in the manifest.json, which does not trigger a permission warning. (Compared to the"declarativeNetRequest" permission, which has the same effect but displays the "Block content on any page" permission warning.)

## Comparison with Manifest Version 2

While this example uses `"manifest_version": 3`, the functionality is not
specific to Manifest Version 3.

To create a MV2 version of the extension, modify `manifest.json` as follows:

- Set `manifest_version` to 2.
- Rename `host_permissions` to `optional_permissions`.
- Rename `action` to `browser_action`.
- Set `web_accessible_resources` to `["redirectTarget.html"]`

As an alternative to renaming `host_permissions` to `optional_permissions`,
add the match patterns in the `host_permissions` array to the
`permissions` key of the MV2 manifest. Then the user does not need to opt in to
the host permission, and the extension works immediately after installation.
