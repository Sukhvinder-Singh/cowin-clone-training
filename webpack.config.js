const path = require("path");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "production",
    entry: {
        "app.min": "./src/js/index.js",
        "style.min": "./src/scss/style.scss"
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
                test: /\.s[ac]ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', "postcss-loader", {
                    loader: "sass-loader",
                    options: {
                        sourceMap: true,
                    }
                }]
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: "Cowin third-party demo",
            filename: "../index.html",
            template: path.join(__dirname, "./public/index.ejs"),
        }),
        new RemoveEmptyScriptsPlugin(),
        new MiniCssExtractPlugin({
            filename: ({ chunk }) => `../css/${chunk.name.replace('/js/', '/css/')}.css`,
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, "dist")
        },
        historyApiFallback: true,
        hot: true,
    }
}