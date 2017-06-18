# proxy-addon

## What it does

This add-on registers a [PAC script](https://developer.mozilla.org/en-US/docs/Web/HTTP/Proxy_servers_and_tunneling/Proxy_Auto-Configuration_%28PAC%29_file) using the proxy API.

The PAC script used to load all requests through a proxy server. If no proxy server address or proxy server
port is specified, then the direct (no proxy) internet connection is used to load all requests.

## Authentication

If the proxy server requires authentication (by sending HTTP status code 407), then authentication info is sent to the proxy server. Authentication does not work for SOCKS servers. Note: after the following bugs are fixed, authentication
info can be specified in the FindProxyForURL() function without need of browser.webRequest.onAuthRequired():

* https://bugzilla.mozilla.org/show_bug.cgi?id=1359693
* https://bugzilla.mozilla.org/show_bug.cgi?id=1359543
* https://bugzilla.mozilla.org/show_bug.cgi?id=1360404


To try it out:
* install it
* open options and specify proxy address and port. username/password optional and they do not work with SOCKS proxy servers
* check your IP address in firefox. it should be the IP address of the proxy server.

## What it shows

* How to implement a simple PAC script, and register it using the proxy API.
* How to exchange messages between a PAC script and a background script.
* How to store proxy info using the storage API
* How to authenticate with HTTP and HTTPS/SSL proxy servers (but not SOCKS proxy servers)
