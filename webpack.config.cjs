const path = require("path");

module.exports = {
  entry: {
    main: path.resolve(__dirname, "./src-swan/entry/main.jsx"),
    preload: path.resolve(__dirname, "./src-swan/entry/preload.js"),
  },
  resolve: {
    extensions: [".js", ".mjs", ".jsx"],
  },
  experiments: {
    outputModule: true,
  },
  output: {
    library: {
      // do not specify a `name` here
      type: "module",
    },
    path: path.resolve(__dirname, "./public/swan-build"),
    filename: "[name].module.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  mode: "production",
};
