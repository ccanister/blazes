const path = require("path");
const { VueLoaderPlugin } = require("vue-loader-v16");
const WebpackBundleAnalyzer = require("webpack-bundle-analyzer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const plugins = [
  new VueLoaderPlugin(),
  new MiniCssExtractPlugin({
    filename: "style.css",
  }),
  new CopyWebpackPlugin({
    patterns: [
      {
        from: path.join(__dirname, "src/sf/src/widgets"),
        to: path.join(__dirname, "./lib/src/sf/src/widgets"),
      },
    ],
  }),
  new OptimizeCssAssetsPlugin(),
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
    filename: "[name].jsdelivr.js",
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
      "vue-router": "vue-router/dist/vue-router.esm-bundler",
      vue: {
        root: "Vue",
        commonjs: "vue",
        commonjs2: "vue",
      },
      axios: "axios",
      "async-validator": "async-validator",
      "@blazes/utils": "@blazes/utils",
      "@blazes/theme": "@blazes/theme/dist/index.jsdelivr.js",
    },
    /^ant-design-vue\/lib/,
    /^@ant-design\/icons-vue/,
  ],
  devtool: "source-map",
};
