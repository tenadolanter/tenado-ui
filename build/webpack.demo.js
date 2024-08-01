const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const launchEditorMiddleware = require("launch-editor-middleware");
const config = require("./config");
const isProd = process.env.NODE_ENV === "production";

const webpackConfig = {
  mode: process.env.NODE_ENV,
  entry: isProd ? { docs: "./examples/entry.js" } : "./examples/entry.js",
  output: {
    path: path.resolve(process.cwd(), "./dist"),
    publicPath: process.env.CI_ENV || "",
    filename: "[name].[chunkhash].js",
    chunkFilename: isProd ? "[name].[chunkhash].js" : "[name].js",
  },
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: config.alias,
    modules: ["node_modules"],
  },
  devServer: {
    host: "0.0.0.0",
    port: 8085,
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error("webpack-dev-server is not defined");
      }
      devServer.app.use("/__open-in-editor", launchEditorMiddleware("code"));
      return middlewares;
    },
  },
  performance: {
    hints: false,
  },
  stats: {
    children: false,
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|babel|es6)$/,
        include: process.cwd(),
        exclude: config.jsexclude,
        loader: "babel-loader",
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          compilerOptions: {
            preserveWhitespace: false,
          },
        },
      },
      {
        test: /\.(scss|css)$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                silent: true,
                logger: {
                  warn: function() {},
                },
              },
            },
          },
        ],
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: "vue-loader",
            options: {
              compilerOptions: {
                preserveWhitespace: false,
              },
            },
          },
          {
            loader: path.resolve(__dirname, "./md-loader/index.js"),
          },
        ],
      },
      {
        test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./examples/index.html",
      filename: "./index.html",
      favicon: "./examples/favicon.ico",
    }),
    new webpack.ProgressPlugin(),
    new VueLoaderPlugin(),
    new webpack.LoaderOptionsPlugin({
      vue: {
        compilerOptions: {
          preserveWhitespace: false,
        },
      },
    }),
  ],
  optimization: {
    minimizer: [],
  },
  devtool: "eval-source-map",
};

if (isProd) {
  webpackConfig.optimization.minimizer.push(
    new TerserWebpackPlugin({ extractComments: false }),
    new CssMinimizerWebpackPlugin()
  );
  // https://webpack.js.org/configuration/optimization/#optimizationsplitchunks
  webpackConfig.optimization.splitChunks = {
    cacheGroups: {
      vendor: {
        test: /\/src\//,
        name: "@tenado/ui",
        chunks: "all",
      },
    },
  };
  delete webpackConfig.devtool;
}

module.exports = webpackConfig;
