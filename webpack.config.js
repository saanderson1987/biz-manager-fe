const webpack = require("webpack");
const path = require("path");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

module.exports = () => {
  const processEnv = Object.entries(process.env).reduce((acc, [key, value]) => {
    acc["process.env." + key] = JSON.stringify(value);
    return acc;
  }, {});

  return {
    mode: "development",
    entry: path.resolve(__dirname, "frontend/index.jsx"),
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "public/"),
      publicPath: "/",
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
        {
          test: /\.s[ac]ss$/i,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        { test: /\.css$/, use: ["style-loader", "css-loader"] },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
    devtool: "source-map",
    plugins: [new webpack.DefinePlugin(processEnv)],
  };
};
