//var path = require("path");
//var webpack = require('webpack');

import * as path from 'path';

//import

// // make production build or development build
// const PROD: boolean = (process.env.NODE_ENV === 'production');

//module.exports =
//export const config =
export default
{
    //entry: './src/handler.ts'
    //entry: ['babel-polyfill', './src/handler.ts']
    entry: ['core-js', './src/handler.ts']

    , output:
    {
        path: path.join(__dirname, 'dist'),
        //filename: PROD ? 'bundle.min.js' : 'bundle.js',
        filename: 'bundle.js',
        libraryTarget: 'commonjs2'
    }

    , resolve:
    {
        // Add `.ts` and `.tsx` as a resolvable extension.
        //extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
        extensions: ['.ts', '.js']
    }

    , module:
    {
        loaders:
        [
            // note that babel-loader is configured to run after ts-loader
            {
                test: /\.ts(x?)$/
                , exclude: /(node_modules|bower_components)/
                // , loader: 'babel-loader?' + JSON.stringify(babelSettings) + '!ts-loader'
                , loader: 'ts-loader'
            }
        ]
    }

    // , plugins: PROD ? [] : []
    // [
    //     new webpack.optimize.UglifyJsPlugin(
    //     {
    //         compress:
    //         {
    //             warnings: false
    //         }
    //     })
    // ] : []

    , target: 'node'    // target node environment
    , devtool: 'source-map'
};
