import * as path from 'path';

export default
{
    entry: ['core-js', './src/handler.ts']

    , output:
    {
        path: path.join(__dirname, 'dist')
        , filename: 'bundle.js'
        , libraryTarget: 'commonjs2'
    }

    , resolve:
    {
        extensions: ['.ts', '.js']
    }

    , module:
    {
        loaders:
        [
            {
                test: /\.ts(x?)$/
                , exclude: /(node_modules|bower_components)/
                , loader: 'ts-loader'
            }
        ]
    }

    , target: 'node'    // target node environment
    , devtool: 'source-map'
};
