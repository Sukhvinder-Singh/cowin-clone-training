const path = require("path");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");

module.exports = {
    mode: "production",
    entry: {
        "app": "./src/js/index.js",
        "app.min": "./src/js/index.js",
        "style.slim": "./dist/css/style.css",
        "style.slim.min": "./dist/css/style.min.css"
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
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: "babel-loader"
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', "postcss-loader"]
            }
        ]
    },
    plugins: [
        new FixStyleOnlyEntriesPlugin(),
        new MiniCssExtractPlugin({
            filename: ({ chunk }) => `../css/${chunk.name.replace('/js/', '/css/')}.css`,
        }),
    ],
}