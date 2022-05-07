const path = require("path");
const CustomWebpackUtil = require("./webpack.utils.js");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const HTMLWebpackPlugin = require("html-webpack-plugin");

const jsBundleName = "app";
const jsEntryPoint = "./src/js/index.js";
const minifiedCssEntryPoint = "./src/scss/style.scss";
const jsOutputDirectory = "./dist/js";
const cssOutputDirectory = "./dist/css";
const relativeJsToCssPath = path.relative(jsOutputDirectory, cssOutputDirectory);

module.exports = {
    mode: "production",
    entry: {
        ...CustomWebpackUtil.getBundleConfig(jsBundleName, jsEntryPoint, minifiedCssEntryPoint),
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
            filename: ({ chunk }) => `${relativeJsToCssPath}/${chunk.name.replace('/js/', '/css/')}.css`,
        }),
    ],
    devServer: {
        static: "dist",
    }
}