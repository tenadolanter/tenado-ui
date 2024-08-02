const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
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
    filename: "[name].[hash:7].js",
    chunkFilename: isProd ? "[name].[hash:7].js" : "[name].js",
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
      /*
       * 编辑器类型 :此处的指令表示的时各个各个编辑器在cmd或terminal中的命令
       * webstorm
       * code // vscode
       * idea
       */
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
          isProd ? MiniCssExtractPlugin.loader : "style-loader",
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
        loader: "url-loader",
        options: {
          limit: 10000,
          name: path.posix.join("static", "[name].[hash:7].[ext]"),
        },
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
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
  webpackConfig.plugins.push(new MiniCssExtractPlugin());
  webpackConfig.optimization.minimizer.push(
    new TerserWebpackPlugin({ extractComments: false }),
    new CssMinimizerWebpackPlugin()
  );
  // https://webpack.js.org/configuration/optimization/#optimizationsplitchunks
  webpackConfig.optimization.splitChunks = {
    cacheGroups: {
      vendor: {
        test: /\/src\//,
        name: "element-ui",
        chunks: "all",
      },
    },
  };
  delete webpackConfig.devtool;
}

module.exports = webpackConfig;
