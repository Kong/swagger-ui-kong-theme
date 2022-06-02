//webpack.config.js

const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const webpack = require('webpack');

module.exports = ({mode = "development"}) => {
    return {
        mode,
        context: __dirname,
        entry: path.resolve(__dirname, 'src', 'index.js'),
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, "public"),
            publicPath: "/",
        },
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader"]
                },
                {
                    test: /\.(js|mjs|jsx|ts|tsx)$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    options: {
                        babelrc: false,
                        configFile: false,
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react"
                        ],
                        sourceMaps: false,
                    }
                },
                {
                    test: /\.(png|j?g|gif)?$/,
                    use: 'file-loader'
                },
                {
                    test: /\.svg$/,
                    use: [
                        {
                            loader: 'svg-url-loader',
                            options: {
                                limit: 10000
                            }
                        }
                    ]
                },

            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'public', 'index.html'),
                favicon: './public/favicon.ico',
                filename: 'index.html',
                manifest: './public/manifest.json',
            }),
            new InterpolateHtmlPlugin({
                PUBLIC_URL: 'public'
            }),
            new webpack.ProvidePlugin({
                process: 'process/browser'
            })
        ],
        devServer: {
            static: {
                directory: path.join(__dirname, 'public'),
            },
            compress: true,
            port: 8000,
        },
        resolve: {
            fallback: {
                "https": require.resolve('https-browserify'),
                "http": require.resolve('stream-http')
            }
        }
    }
}
