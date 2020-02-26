const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let plugins = [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        title: 'Satisfactory Calculator',
        template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
        filename: 'style.[name].css'
    }),
    new webpack.HotModuleReplacementPlugin()
];

const config = {
    entry: './src/index.js',
    devServer: {
        contentBase: './dist',
        hot: true
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins,
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    'css-loader'
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(ico|svg)$/,
                loader: 'file-loader'
            }
        ]
    },
    resolve: {
        extensions: ['*']
    }
};

module.exports = config;
