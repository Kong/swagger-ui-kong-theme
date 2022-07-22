const hash = require('child_process')
  .execSync('git rev-parse --short HEAD')
  .toString().replace(/(\r\n|\n|\r)/gm, '')

module.exports = {
  entry: './src/index.js',
  watch: true,
  devtool: process.env.DEBUG ? 'eval-source-map' : undefined,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      { test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: ['url-loader']
      },
      {
         test: /\.(woff|woff2|eot|ttf|otf)$/,
         use: [ 'file-loader']
       }
    ]
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom'
    }
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/../kong-portal-templates/workspaces/default/themes/base/assets/js',
    publicPath: '/',
    filename: `swagger-ui-kong-theme-${hash}.${process.env.DEBUG ? 'debug' : 'min'}.js`,
    library: 'SwaggerUIKongTheme',
    libraryTarget: 'umd'
  },
  devServer: {
    contentBase: './dist'
  },
  optimization: process.env.DEBUG ? {
    minimize: false
  } : undefined
}
