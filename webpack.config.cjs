const path = require("path");

const generate = require("./proxy-generator.cjs").generate;

generate({
  libs: [
    {
      name: "three",
      writeTo: path.resolve(__dirname, "./swan-proxy/three.js"),
    },
    {
      name: "react",
      writeTo: path.resolve(__dirname, "./swan-proxy/react.js"),
    },
    {
      name: "zustand",
      writeTo: path.resolve(__dirname, "./swan-proxy/zustand.js"),
    },
    {
      name: "@react-three/fiber",
      writeTo: path.resolve(__dirname, "./swan-proxy/r3f.js"),
    },
    {
      name: "@react-three/drei",
      writeTo: path.resolve(__dirname, "./swan-proxy/drei.js"),
    },
    {
      name: "@react-three/xr",
      writeTo: path.resolve(__dirname, "./swan-proxy/xr.js"),
    },
    {
      name: "three-stdlib",
      writeTo: path.resolve(__dirname, "./swan-proxy/three-stdlib.js"),
    },
  ],
});

module.exports = {
  entry: {
    main: path.resolve(__dirname, "./src-swan/entry/main.jsx"),
    preload: path.resolve(__dirname, "./src-swan/entry/preload.js"),
  },
  resolve: {
    alias: {
      ["three"]: path.resolve(__dirname, "./swan-proxy/three.js"),
      ["react"]: path.resolve(__dirname, "./swan-proxy/react.js"),
      ["zustand"]: path.resolve(__dirname, "./swan-proxy/zustand.js"),
      ["@react-three/fiber"]: path.resolve(__dirname, "./swan-proxy/r3f.js"),
      ["@react-three/drei"]: path.resolve(__dirname, "./swan-proxy/drei.js"),
      ["@react-three/xr"]: path.resolve(__dirname, "./swan-proxy/xr.js"),
      ["three-stdlib"]: path.resolve(__dirname, "./swan-proxy/three-stdlib.js"),
    },
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
