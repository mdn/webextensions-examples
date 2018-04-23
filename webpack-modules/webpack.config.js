const path = require("path");

module.exports = {
    entry: {
        background_scripts: "./background_scripts/background.js",
        popup: "./popup/left-pad.js"
    },
    output: {
        path: path.resolve(__dirname, "addon"),
        filename: "[name]/index.js"
    }
};
