# webauthn

This extension illustrates the use of [navigator.credentials.create()](https://developer.mozilla.org/en-US/docs/Web/API/CredentialsContainer/create) and [navigator.credentials.get()](https://developer.mozilla.org/en-US/docs/Web/API/CredentialsContainer/get) to create and validate credentials that a website can use to authenticate a user.

## What it does ##

The extension includes an action with a popup that includes HTML, CSS, and JavaScript.

When you click the action (toolbar button), the extension's popup opens, enabling you to:

* Paste a JSON file.
* Click a button to register the JSON using `navigator.credentials.create()`.
* Click a button to authenticate the JSON using `navigator.credentials.get()`.


When you click a button, the JavaScript reads the JSON file and, if needed, converts the challenge and user ID to an ArrayBuffer. It then runs the selected `navigator.credentials` method. 

If you choose to register the JSON, you get either a confirmation or an error message, depending on the outcome.

If you choose to authenticate JSON, you get either details of the credential ID, authenticator data, client data JSON, and signature, or an error message if the authentication fails.

## What it shows ##

In this example, you see how to:

* Use an action (toolbar button) with a popup.
* Give a popup style and behavior using CSS and JavaScript.
* Convert strings in base64 to an ArrayBuffer.
* Execute `navigator.credentials.create()` and `navigator.credentials.get()`.
