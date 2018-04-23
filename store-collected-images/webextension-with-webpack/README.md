# "Image Reference Collector" example built with webpack (and React UI)

## Usage

This example is built using Babel and Webpack, and so the transpiled bundles have to
be built first:

you need to change into the example subdirectory and install all
[NodeJS][nodejs] dependencies with [npm](http://npmjs.com/) or
[yarn](https://yarnpkg.com/):

    npm install

You can build the extension using:

    npm run build

This creates the source bundles for the WebExtension in the `extension` subdirectory, and
you can manually install the add-on on Firefox by loading the `extension` from the
"about:debugging#addons" page.

You can also build the sources and start a new Firefox instance with the add-on installed
in one command:

    npm run start

To start a webpack instance that automatically rebuilds the add-on when
you change the sources, in another shell window, you can run the following npm script:

    npm run build:watch

While this npm script is running, any time you edit a file, it will be rebuilt automatically.
