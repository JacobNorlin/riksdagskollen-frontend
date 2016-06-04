/**
 * Created by Johan on 2015-08-31.
 */

var fs = require('fs')
var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var DefinePlugin = require('webpack/lib/DefinePlugin')

var isProduction = process.env.NODE_ENV === 'production'
var assets = {
    bundle: isProduction ? 'bundle.[hash].js' : 'bundle.js',
    style: isProduction ? 'style.[hash].css' : 'style.css'
}
var excludes = /node_modules|bower_components|typings|test/

var config = {
    entry: {
        javascript: './src/index.tsx',
    },
    output: {
        path: __dirname + '/build',
        filename: assets.bundle
    },
    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                exclude: excludes,
                loader: 'ts-loader'
            },
            {
                test: /\.less$/,
                exclude: excludes,
                loader: ExtractTextPlugin.extract('css!less?compress')
            }
        ],
    },
    plugins: [
        new ExtractTextPlugin(assets.style, {
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new DefinePlugin({
            // webpack replaces the string as-is, so extra quotes are needed
            'process.env.NODE_ENV': '"' + process.env.NODE_ENV + '"',
        })
    ]
}

module.exports = config
