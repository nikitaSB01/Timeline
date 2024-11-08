const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  devtool: "source-map",
  entry: "./src/index.js", // Убедитесь, что у вас есть точка входа
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js", // Название выходного файла JavaScript
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      favicon: "./src/assets/icons8-favicon-48.png", // Путь к фавиконке
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "./css/style.css", // Убедитесь, что путь здесь правильный
      chunkFilename: "css/style.css", // Путь для чанк-файлов CSS
    }),
  ],
  resolve: {
    extensions: [".js", ".css"], // Убедитесь, что расширения файлов указаны
  },
};
