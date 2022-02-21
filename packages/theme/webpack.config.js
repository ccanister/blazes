const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WebpackBundleAnalyzer = require("webpack-bundle-analyzer");

const plugins = [
  new CopyWebpackPlugin({
    patterns: [
      {
        from: path.join(__dirname, "system"),
        to: path.join(__dirname, "./dist"),
      },
    ],
  }),
];
if (process.env.npm_lifecycle_event === "analyze") {
  plugins.push(
    new WebpackBundleAnalyzer.BundleAnalyzerPlugin({
      analyzerPort: 8890,
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
    library: "blazeTheme",
    libraryTarget: "umd",
  },
  resolve: {
    extensions: [".ts", ".js"],
    // 不加alias也能找到包的解析路径
    // alias: {
    //   "@blazes/utils": path.resolve(__dirname, "../utils"),
    // },
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
  externals: [
    {
      "ant-design-vue/es/modal": "ant-design-vue/es/modal",
      vue: {
        root: "Vue",
        commonjs: "vue",
        commonjs2: "vue",
      },
      axios: "axios",
      "async-validator": "async-validator",
      "vue-router": "vue-router",
    },
    /^@blazes\/utils/,
    /^@ant-design\/icons-vue/,
  ],
};
