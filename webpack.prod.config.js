﻿const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const config = require("./webpack.base.config");

config.output.filename = "[name].[chunkhash:8].js";
config.output.chunkFilename = "[id].[chunkhash:8].chunk.js";

config.module.rules.push(
    {
        test: /\.css$/,
        use: ExtractTextPlugin.extract(
            {
                use: ["css-loader"],
                fallback: "style-loader"
            }
        ),
        include: /node_modules/
    },
    {
        test: /\.less$/,
        use: ExtractTextPlugin.extract(
            {
                use: ["css-loader", "less-loader"],
                fallback: "style-loader"
            }
        ),
        include: /node_modules/
    },
    {
        test: /\.less$/,
        use: ExtractTextPlugin.extract(
            {
                use:
                [
                    {
                        loader: "css-loader",
                        options:
                        {
                            modules: true,
                            localIdentName: "[name]-[local]__[hash:base64:8]"
                        }
                    },
                    "less-loader"
                ],
                fallback: "style-loader"
            }
        ),
        exclude: /node_modules/
    }
);

config.plugins.push(
    new webpack.LoaderOptionsPlugin({ minimize: true }),
    new ExtractTextPlugin(
        {
            filename: "res/[name].[contenthash:8].css",
            allChunks: true,
            ignoreOrder: true
        }
    ),
    new webpack.DefinePlugin(
        {
            "process.env": { NODE_ENV: JSON.stringify("production") }
        }
    ),
    new webpack.optimize.UglifyJsPlugin(
        {
            compress: { warnings: false }
        }
    )
);

module.exports = config;
