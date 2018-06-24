const path = require('path');

module.exports = {
  entry: {
    game: './game/src/js/index.js',
    index: './src/js/index.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist/js'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  resolve: {
    alias: {
      // bind version of jquery-ui
      'jquery-ui': 'jquery-ui/ui/widgets',
      // bind to modules;
      modules: path.join(__dirname, 'node_modules'),
    },
  },
};