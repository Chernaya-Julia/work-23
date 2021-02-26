const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const forkTSCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { resolve } = require('path');
const webpack = require('webpack');
const envVariables = require('dotenv').config().parsed;

module.exports = ({NODE_ENV}) =>{
    return {
    //entry: resolve(__dirname, './src/index.js'),
    entry: ['./src/index.ts', './src/styles.scss'],
    mode: NODE_ENV === 'production' ? 'production' : 'development',
    module: {
        rules: [ 
            {
                test: /\.[tj]s$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        
                        plugins: [
                            '@babel/plugin-proposal-class-properties'
                        ],
                    }
                }
            },
            {      
                test: /\.(s?a?)?css$/,
                use: [
                    NODE_ENV === 'production'  
                    ? MiniCssExtractPlugin.loader 
                    : 'style-loader',
                    'css-loader', 
                    'sass-loader',
                ],
            },            
        ],    
    },
    plugins: [
        new forkTSCheckerWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new HtmlWebpackPlugin({
            template: resolve(__dirname,'./src/index.html'),
        }),
        new webpack.DefinePlugin({
            abc: JSON.stringify('abc'),
            process: JSON.stringify({ env: envVariables }),
        })
    ]
}
}

