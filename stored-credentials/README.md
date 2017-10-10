# stored-credentials

**Although this add-on uses a stored password to authenticate to a web server,
it should not be taken as an example of how to store or work securely with
passwords. It's only a demonstration of how to use the
[`webRequest.onAuthRequired`](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/webRequest/onAuthRequired) API.**

This add-on uses the [`webRequest.onAuthRequired`](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/webRequest/onAuthRequired) API to log the user into
the demo site at https://httpbin.org/basic-auth/user/passwd using a stored
username and password.

This add-on stores a username and password using the [`storage.local`](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/storage/local) API.
The default value is the correct value
for the demo site:

    username: "user"
    password: "passwd"

You can change the default values in the add-on's [options page](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Options_pages).

The add-on then uses `webRequest.onAuthRequired` to intercept authentication
requests from the demo site. When it gets
such a request, it fetches the stored credentials and supplies them
asynchronously.

To try out the add-on:

* Before installing the add-on, visit https://httpbin.org/basic-auth/user/passwd,
and see that it asks for a username and password.
* [Install the add-on](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Temporary_Installation_in_Firefox) in Firefox 54 or later.
* Visit https://httpbin.org/basic-auth/user/passwd again, and see that authentication succeeds automatically.
 
