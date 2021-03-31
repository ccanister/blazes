const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WebpackBundleAnalyzer = require("webpack-bundle-analyzer");

const plugins = [
  new CopyWebpackPlugin({
    patterns: [
      {
        from: path.join(__dirname, "system"),
        to: path.join(__dirname, "../../flame/theme"),
      },
    ],
  }),
];
if (process.env.npm_lifecycle_event === "analyze") {
  plugins.push(new WebpackBundleAnalyzer.BundleAnalyzerPlugin({
    analyzerPort: 8890
  }));
}

module.exports = {
  mode: "production",
  entry: {
    index: "./index.ts",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "../../flame/theme"),
    publicPath: "/",
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: { "@flame": path.resolve(__dirname, "../../packages") },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: ["babel-loader", "ts-loader"],
        exclude: /node_modules/,
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
    "axios": "axios",
    "async-validator": "async-validator",
  },
};
