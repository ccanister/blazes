const path = require("path");
const fs = require("fs");
const { VueLoaderPlugin } = require("vue-loader-v16");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const files = fs.readdirSync(path.join(__dirname, "src"));

const resolvePath = (name) => path.join(__dirname, name);

const plugins = [
  new VueLoaderPlugin(),
  new MiniCssExtractPlugin({
    filename: "[name].css",
  }),
  new OptimizeCssAssetsPlugin(),
];

module.exports = {
  mode: "production",
  entry: files.reduce((result, cur) => {
    result[`${cur}/index`] = resolvePath(`src/${cur}`);
    return result;
  }, {}),
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./lib"),
    publicPath: "/",
    libraryTarget: "umd",
  },
  resolve: {
    extensions: [".ts", ".js", ".vue"],
    alias: { "@blazes": path.resolve(__dirname, "../../packages") },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          "babel-loader",
          { loader: "ts-loader", options: { appendTsSuffixTo: [/\.vue$/] } },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        loader: "vue-loader-v16",
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
      },
    ],
  },
  plugins,
  externals: [
    {
      "vue-router": "vue-router",
      vue: {
        root: "Vue",
        commonjs: "vue",
        commonjs2: "vue",
      },
      axios: "axios",
      "async-validator": "async-validator",
    },
    /^@blazes\/utils/,
    /^@blazes\/theme/,
    /^ant-design-vue\/lib/,
    /^@ant-design\/icons-vue/,
  ],
  devtool: "source-map",
};
