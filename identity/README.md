# identity example
Example using chrome.identity with facebook and google.

The use of the identity api can be found in the authorize function in
background.js.  The rest of the code provides a working example of using
oauth with Facebook and Google.

# First time run before setting up applications.

You will want to set a specific ID in your manifest.json file.  In this example,
it is set to identity.example@mozilla.org.  The identity API has a helper
function that generates a hashed URL based on the ID.  If you do not have a
specific ID set, the extension id will change every time you install the
extension (or reload as a temporary addon).

Load the extension as a temporary addon in about:debugging then open the
Brower console and look for a message: Your redirect_uri is XXX.  This message
is output by the addon on startup to make it easy to find.  Copy the URL, you
will need it to configure Facebook and Google.

# Configuring Facebook

Visit https://developers.facebook.com/apps/ to create a test app.

1. Click on Add a New App.  Give it a name (e.g. Test Identity) and click on "Create App ID"
2. Click on "Add Product" the choose Facebook Login, it will appear under "Products"
3. Ignore the Quickstart and select "Settings"
4. Enter the redirect_uri from above.
5. Click on Settings->Basic and copy the App ID and Secret.  This is your clientId and secret for Facebook.
6. Edit background.js and change the clientId and secret to match the above.
7. Reload the addon in about:debugging and click on the addon button in the toolbar, try logging into Facebook.

# Configuring Google

Visit https://console.developers.google.com/ to create a test app

1. Click on Credentials
2. Click on the button Create Credentials, then in the popdown select OAuth Client ID.
3. Choose Web Application
4. Give your app a name such as Identity Test
5. Enter the redirect_uri from above for the "Authorised redirect URIs".
6. Copy the client ID from the dialog that appears (You only need the client id).
7. Edit background.js and change the value for Google.
8. Reload the addon in about:debugging and click on the addon button in the toolbar, try logging into Google.





