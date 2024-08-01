const path = require("path");
const webpack = require("webpack");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

const Components = require("../components.json");
const config = require("./config");

const webpackConfig = {
  mode: "production",
  entry: Components,
  output: {
    path: path.resolve(process.cwd(), "./lib"),
    publicPath: "/dist/",
    filename: "[name].js",
    chunkFilename: "[id].js",
    library: {
      type: "commonjs2",
    },
  },
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: config.alias,
    modules: ["node_modules"],
  },
  externals: config.externals,
  performance: {
    hints: false,
  },
  stats: "none",
  optimization: {
    minimize: false,
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
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [new webpack.ProgressPlugin(), new VueLoaderPlugin()],
};

module.exports = webpackConfig;
