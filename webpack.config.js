const path = require("path");

const outputs = {
  development: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    filename: `bundle.js`,
    library: "SwaggerUIKongTheme",
    libraryTarget: "umd",
  },
  production: {
    path: path.join(
      __dirname,
      "/../kong-portal-templates/workspaces/default/themes/base/assets/js"
    ),
    publicPath: "/",
    filename: 'static.js',
    library: "SwaggerUIKongTheme",
    libraryTarget: "umd",
  },
};

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
        root: "React",
        commonjs2: "react",
        commonjs: "react",
        amd: "react",
      }
    },
    resolve: {
      extensions: ["*", ".js", ".jsx"],
      fallback: {
        stream: require.resolve("stream-browserify"),
        buffer: require.resolve("buffer/"),
        util: require.resolve("util/"),
        url: require.resolve("url/"),
        querystring: require.resolve("querystring-es3"),
      }
    },
    output: outputs[argv.mode],
    devServer: {
      contentBase: "dist/",
    },
    optimization: {
      chunkIds: 'deterministic'
    }
  };
};
