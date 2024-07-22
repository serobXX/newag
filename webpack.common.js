const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const { DefinePlugin } = require('webpack');
const rootFolder = path.join(__dirname);
require('dotenv').config();

const env = process.env;
module.exports = {
  devServer: {
    historyApiFallback: true,
  },
  entry: './src/index.tsx',
  output: {
    filename: '[fullhash].js',
    path: __dirname + '/dist/',
    clean: true,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: ['.ts', '.tsx', '.js', '.json'],
        },
        use: 'ts-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      name: (module, chunks, cacheGroupKey) => {
        const allChunksNames = chunks.map((chunk) => chunk.name).join('-');
        return allChunksNames;
      },
    },
  },
  resolve: {
    alias: {
      '~components': path.join(rootFolder, './src/components'),
      '~constants': path.join(rootFolder, './src/constants'),
      '~assets': path.join(rootFolder, './src/assets'),
      '~hooks': path.join(rootFolder, './src/hooks'),
      '~pages': path.join(rootFolder, './src/pages'),
      '~types': path.join(rootFolder, './src/types'),
      '~utils': path.join(rootFolder, './src/utils'),
      '~i18n': path.join(rootFolder, './src/i18n'),
      '~services': path.join(rootFolder, './src/services'),
      '~styles': path.join(rootFolder, './src/scss'),
      styles: path.join(rootFolder, './src/scss'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
    new MiniCssExtractPlugin(),
    new DefinePlugin({
      process: {
        env: Object.entries(env).reduce((acc, v) => {
          acc[v[0]] = JSON.stringify(v[1]);
          return acc;
        }, {}),
      },
    }),
  ],
};
