This is a built version of most of the extensions in this repository. It excludes:

* webpack-modules: because this one is all about building the module using webpack

Because the extensions mostly have no application id, they can be signed by anyone on addons.mozilla.org. We haven't checked in or stored those ids so you can rebuild them if you'd like. We don't expect end users to be expecting these examples to update automatically (which is what the id is for).

A couple do have ids. You can still sign them yourself by changing the application id. If you'd like to sign them officially and add them to this repo, contact @andymckay or @wbamberg and they can do it for you.

If an extension changes and you'd like to rebuild it, then you should probably update the version number before building it.

To build a new version of the extension use the web-ext sign command, for example:

    pushd ../commands/ && web-ext sign --artifacts-dir ../build && popd
