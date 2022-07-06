//webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");


module.exports = ({ mode = "development" }) => {
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
                filename: 'index.html',
                manifest: path.resolve('manifest.json'),
            }),
            new InterpolateHtmlPlugin({
                PUBLIC_URL: 'public'
            }),
            new NodePolyfillPlugin(),
        ],
        devServer: {
            static: {
                directory: path.join(__dirname, 'public'),
            },
            compress: true,
            port: 3000,
            historyApiFallback: true
        },
        resolve: {
            alias: {
                react: path.resolve('./node_modules/react'),
                'react-dom': path.resolve('./node_modules/react-dom'),
            },            
        }
    }
}
