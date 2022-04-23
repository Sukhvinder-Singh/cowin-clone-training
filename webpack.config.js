const path = require("path");
const TerserWebpackPlugin = require("terser-webpack-plugin");

module.exports = {
    mode: "production",
    entry: {
        "app": "./src/js/index.js",
        "app.min": "./src/js/index.js"
    },
    output: {
        path: path.resolve(__dirname, "./dist/js"),
        filename: "[name].js",
        clean: true,
    },
    target: ["web", "es5"],
    devtool: "source-map",
    optimization: {
        minimize: true,
        minimizer: [
            new TerserWebpackPlugin({
                include: /min/
            }),
        ]
    }
}