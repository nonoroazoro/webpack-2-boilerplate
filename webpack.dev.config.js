﻿const webpack = require("webpack");
const config = require("./webpack.base.config");

config.module.rules.push(
    {
        enforce: "pre",
        test: /\.jsx?$/,
        use: ["eslint-loader"],
        exclude: /node_modules/
    },
    {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
    },
    {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"]
    }
);

config.plugins.push(
    new webpack.SourceMapDevToolPlugin({
        filename: "[file].map",
        exclude: ["vendor.js"]
    })
);

// HMR.
for (const key of Object.keys(config.entry))
{
    config.entry[key].unshift(
        "react-hot-loader/patch",
        "webpack-hot-middleware/client"
    );
}
config.plugins.push(
    new webpack.HotModuleReplacementPlugin()
);

module.exports = config;
