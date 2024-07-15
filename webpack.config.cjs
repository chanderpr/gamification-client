const path = require('path');
// import path from 'path';

module.exports = {
  entry: './src/main.jsx', // Your application's entry point
  output: {
    filename: 'frontend-bundle.js', // The name of the output bundle
    path: path.resolve(__dirname, 'dist'), // The output directory
  },
  module: {
    rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                  presets: ['@babel/preset-react'],
              },
          },
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
        },
        {
            test: /\.(png|svg|jpg|gif)$/,
            use: ['file-loader'],
        },
    ],
  },
  mode: 'production', // Set the mode to 'production' for optimized bundle
};