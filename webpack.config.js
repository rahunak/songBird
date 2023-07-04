const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'production',
  entry: './index.js',
  output: {
    filename: '[contenthash].js',
    path: path.resolve(__dirname, 'songBird'),
  },
  devServer: {
    port: 4200,
    hot: isDev,
  },
  optimization: {

    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader'],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'sass-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,

      },
      {
        test: /\.(ico|svg|png|jpg|gif|wav|mp3|ogg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/img/[name][ext][query]',
        },
      },
      {
        test: /\.(mp3|wav|ogg)$/i,
        type: 'asset',
        generator: {
          filename: 'assets/audio/[name][ext][query]',
        },
      },
      {
        test: /\.(html)$/,
        use: ['html-loader'],
      },


    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "src", "pages", "startPage.html")
    }),
    new HtmlWebpackPlugin({
      filename: "quiz.html",
      template: path.resolve(__dirname, "src", "pages", "quiz.html")
    }),
    new HtmlWebpackPlugin({
      filename: "results.html",
      template: path.resolve(__dirname, "src", "pages", "results.html")
    }),
    new HtmlWebpackPlugin({
      filename: "gallery.html",
      template: path.resolve(__dirname, "src", "pages", "gallery.html")
    }),

    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[contenthash].css',
    }),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname, 'src/components/images'),
    //       to: path.resolve(__dirname, 'dist'),
    //     },
    //   ],
    // }),
  ],
};
