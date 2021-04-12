const path = require("path");
const { VueLoaderPlugin } = require("vue-loader-v16");
const WebpackBundleAnalyzer = require("webpack-bundle-analyzer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const plugins = [
  new VueLoaderPlugin(),
  new MiniCssExtractPlugin({
    filename: "style.css",
  }),
];
if (process.env.npm_lifecycle_event === "analyze") {
  plugins.push(
    new WebpackBundleAnalyzer.BundleAnalyzerPlugin({
      analyzerPort: 8902,
    })
  );
}

module.exports = {
  mode: "production",
  entry: {
    index: "./index.ts",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./dist"),
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
  externals: {
    "vue-router": "vue-router",
    "ant-design-vue": "ant-design-vue",
    vue: {
      root: "Vue",
      commonjs: "vue",
      commonjs2: "vue",
    },
    axios: "axios",
    "async-validator": "async-validator",
    "@ant-design/icons-vue": "@ant-design/icons-vue",
    "@blazes/utils": "blazes-utils",
    "@blazes/theme": "blazes-theme",
  },
};
