const path = require("path");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const HTMLWebpackPlugin = require("html-webpack-plugin");


let jsOutputDirectory = "./dist/js";
let cssOutputDirectory ="./dist/css";

module.exports = {
    mode: "production",
    entry: {
        "app.min": "./src/js/index.js",
        "style.min": "./src/scss/style.scss"
    },
    output: {
        path: path.resolve(__dirname, jsOutputDirectory),
        filename: "[name].js",
        clean: true,
    },
    target: "web",
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
            template: path.join(__dirname, "./public/index.html"),
        }),
        new RemoveEmptyScriptsPlugin(),
        new MiniCssExtractPlugin({
            filename: ({ chunk }) => `${path.relative(jsOutputDirectory, cssOutputDirectory)}/${chunk.name.replace('/js/', '/css/')}.css`,
        }),
    ],
    devServer: {
        static: "dist",
    }
}