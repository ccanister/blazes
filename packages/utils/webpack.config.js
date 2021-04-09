const path = require("path");

module.exports = {
  mode: "production",
  entry: {
    index: "./index.ts",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "../../blazes/utils"),
    publicPath: "/",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  externals: {
    vue: {
      root: "Vue",
      commonjs: "vue",
      commonjs2: "vue",
    },
  },
};
