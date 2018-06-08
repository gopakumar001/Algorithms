const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
    watch: true,
    devtool: 'source-map',
    entry: {
        bundle: "./index.js",
        vendor: ["d3"]
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "[name].js"
    },
    module: {
        rules: [{
            use: "babel-loader",
            test: /\.js$/
        },{
            test:/\.css$/,
            use:['style-loader','css-loader']
        }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor"
        }),
        new HtmlWebpackPlugin({
            template : "index.html"
        })
    ]
};

module.exports = config;