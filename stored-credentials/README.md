# stored-credentials

**Although this add-on uses a stored password to authenticate to a web server,
it should not be taken as an example of how to store or work securely with
passwords. It's only a demonstration of how to use the
`webRequest.onAuthRequired` API.**

This add-on uses the `webRequest.onAuthRequired` API to log the user into
the demo site at https://httpbin.org/basic-auth/user/passwd using a stored
username and password.

This add-on stores a username and password using the storage.local API.
The default value is the correct value
for https://httpbin.org/basic-auth/user/passwd:

    username: "user"
    password: "passwd"

You can change the default password in the add-on's options page.

The add-on then uses `webRequest.onAuthRequired` to intercept authentication
requests from https://httpbin.org/basic-auth/user/passwd. When it gets
such a request, it fetches the stpred credentials and supplies them
asynchronously.

To try out the add-on, try:
* disabling the add-on, visit https://httpbin.org/basic-auth/user/passwd,
and see that it asks for a username and password
* changing the stored username or password in the options page,
and see that authentication fails.
* changing the stored username and password back to the correct value,
and see that authentication succeeds automatically.
 
