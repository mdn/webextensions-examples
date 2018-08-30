# root-cert-stats

## What it does ##

The extension includes:

* a background page which collects stats about the trusted root certs used when
browsing the web. It records the subject name of each root cert, and how many
times that particular root cert was used to establish a TLS connection.

* a browser action with a popup. The popup displays the collected stats.

## What it shows ##

* how to use the webRequest.getSecurityInfo() API.
