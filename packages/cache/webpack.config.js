const path = require("path");

module.exports = {
  mode: "production",
  entry: {
    index: "./index.ts",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/",
    library: "blazeCache",
    libraryTarget: "umd",
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
    moment: "moment",
  },
};
