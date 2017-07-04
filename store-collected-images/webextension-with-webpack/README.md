# "Image Reference Collector" example built with webpack (and React UI)

## Usage

This example is built using Babel and Webpack, and so the transpiled bundles have to
be built first:

you need to change into the example subdirectory and install all
[NodeJS][nodejs] dependencies with [npm](http://npmjs.com/) or
[yarn](https://yarnpkg.com/):

    npm install

Now you can build the sources and start the extension in one command:

    npm run start

This creates the source bundles for the WebExtension in the `extension` subdirectory.

To start a webpack instance that automatically rebuild the extension when
you change the sources, in another shell window, you can run the following npm script:

    npm run build:watch

While this npm script is running, any time you edit a file, it will be rebuilt automatically).
