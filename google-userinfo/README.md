# google-userinfo

This add-on fetches the user's info from their Google account and displays their name in a notification.

In detail, it adds a browser action. When the user clicks the browser action, the add-on:

* uses `identity.launchWebAuthFlow()` to get an access token from Google. This asks the user to sign into Google, if they are not already signed in (authentication), then asks the user if they grant the WebExtension permission to get their user info, if the user has not already granted this permission (authorization).

* validates the access token

* passes the access token into a Google API that returns the user's info

* displays a notification containing the user's name.

This is following essentially the process documented here: https://developers.google.com/identity/protocols/OAuth2UserAgent.

## Setup ##

There's some basic setup you must do before you can use this example.

* **getting the redirect URL**: this represents the end point of the flow, where the access token is delivered to the WebExtension. The redirect URL is derived from the WebExtension's ID. To get the redirect URL for this example, install it, visit about:addons, and open its "Preferences" page. It will look something like "https://dc6ae45f54e3d55036b819b93a1876228e5f5f7b.extensions.allizom.org/".

* **registering your add-on with Google as an OAuth2 client**.
  * Visit https://console.developers.google.com/apis/credentials
  * Click "Create credentials", and select "OAuth client ID"
  * Select "Web application", and give it a name. The name is shown to the user to help them understand whether to authorize the add-on.
  * Paste the redirect URL into the " Authorized redirect URIs" box.
  * Click "Create"
  * You'll see a popup containing a Client ID and a secret. Copy the client ID (you can ignore the secret).
  * Paste this value into authorize.js in place of YOUR-CLIENT-ID.
  * Reload the add-on.

Note that because you have to edit authorize.js, we can't provide a prebuilt, presigned version of this add-on in the "builds" directory of this repo, as we can for other examples. So to run this example in Firefox you'll need to use the ["Load Temporary Add-on"](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Temporary_Installation_in_Firefox) feature, or use the [web-ext](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Getting_started_with_web-ext) tool.
