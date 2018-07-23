const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanObsoleteChunks = require('webpack-clean-obsolete-chunks')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const isDevelopment = process.env.NODE_ENV !== 'production'

module.exports = {
    mode: 'development',
    target: 'web',
    entry: [
        '@babel/polyfill',
        path.resolve(__dirname, './src/main.js')
    ],
    output: {
        publicPath: "/",
        path: path.join(__dirname, './dist'),
        filename: 'js/[name].bundle.js',
        chunkFilename: 'js/[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [
                    isDevelopment ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
                    {loader: 'css-loader', options: {sourceMap: true}},
                    {loader: 'sass-loader', options: {sourceMap: true, outputStyle: 'compressed'}}
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    isDevelopment ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
                    {loader: 'css-loader', options: {sourceMap: true}},
                    {loader: 'sass-loader', options: {sourceMap: true, outputStyle: 'compressed'}}
                ],
            },
            {
                test: /\.(gif|png|jpe?g)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            useRelativePath: true,
                        }
                    },
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts',
                    }
                }]
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, './src'),
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    plugins: [
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(path.resolve(__dirname, './dist')),
        new MiniCssExtractPlugin({
            filename: "css/[name].bundle.css",
            sourceMap: true,
            chunkFilename: "[id].[hash].css"
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, './webpack/index.html')

        }),
        new CleanObsoleteChunks({
            verbose: true,
            deep: true
        })
    ]
};
