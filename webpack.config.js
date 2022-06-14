const path = require("path");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = (env, argv) => {
  return {
    entry: "./src/index.js",
    watch: true,
    devtool: 'eval',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: ["file-loader"],
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
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
      extensions: ["*", ".js", ".jsx"],      
      modules: [path.resolve(process.cwd(), 'src'), 'node_modules'],
      symlinks: false,
      cacheWithContext: false
    },
    output: {
      path: path.join(__dirname, "dist"),
      publicPath: "/",
      filename: `bundle.js`,
      library: "SwaggerUIKongTheme",
      libraryTarget: "umd",
    },
    devServer: {
      contentBase: "dist/",
    },
    optimization: {
      chunkIds: 'deterministic'
    },
    plugins: [
      new NodePolyfillPlugin(),
    ],
  };
};
