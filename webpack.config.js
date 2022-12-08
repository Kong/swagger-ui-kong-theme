const webpack = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env, { mode }) => {
  const production = mode !== 'development'

  return {
    target: 'web',
    entry: './src/index.js',
    devtool: production ? false : 'eval',
    module: {
      rules: [
        {
          test: /\.jsx?$/i,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        { test: /\.(png|jpe?g|gif|svg)$/i,
          use: ['url-loader']
        },
        {
          test: /\.s?css$/i,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: {
                  auto: true,
                  localIdentName: production ? '[hash:base64:6]' : '[local]--[hash:base64:6]',
                  exportLocalsConvention: 'camelCase'
                },
                importLoaders: 1
              }
            },
            'sass-loader'
          ]
        }
      ]
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: 'process/browser'
      }),
      new MiniCssExtractPlugin()
    ],
    externals: {
      react: 'react',
      'react-dom': 'react-dom'
    },
    resolve: {
      extensions: ['.js', '.jsx', '.css', '.scss'],
      alias: {
        process: 'process/browser'
      },
      fallback: {
        util: false,
        buffer: require.resolve('buffer/'),
        url: require.resolve('url/'),
        querystring: require.resolve("querystring-es3")
      }
    },
    output: {
      path: path.join(__dirname, 'dist'),
      publicPath: '/',
      library: 'SwaggerUIKongTheme',
      libraryTarget: 'umd'
    },
    devServer: {
      contentBase: './dist'
    }
  }
}
