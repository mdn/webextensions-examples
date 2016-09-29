module.exports = {
    entry: {
        background_scripts: "./background_scripts/background.js",
        popup: "./popup/left-pad.js"
    },
    output: {
        path: "addon",
        filename: "[name]/index.js"
    }
};
