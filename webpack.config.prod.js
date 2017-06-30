import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
    debug: true,
    devtool: 'source-map',
    noInfo: false,
    entry: {
        vendor: path.resolve(__dirname, "src/vendor"),
        main: path.resolve(__dirname, 'src/index')
    },
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].[chunkhash].js'
    },
    plugins: [
        // Generate an external css filename with a hash in the filename
        new ExtractTextPlugin('[name].[contenthash].css'),

        //Hash the files using MD5 so that their names change when the content changes
        new WebpackMd5Hash(),

        // Use CommonsChunkPlugin to create a separate bundle
        // of vendor libraries so theat they're cached separately
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'  // note it matches the entry key above
        }),

        //create HTML file that includes reference to bundled JS
        new HtmlWebpackPlugin({
            template: 'src/HTMLPage1.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            },
            inject: true
        }),

        //Eliminate duplicat packages when generating bundle
        new webpack.optimize.DedupePlugin(),
        //Minify JS
        new webpack.optimize.UglifyJsPlugin()
    ],
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loaders: ['babel'] },
            { test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourcemap') }
        ]
    }
}
