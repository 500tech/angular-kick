/* global __dirname, process */

const webpack           = require('webpack');
const path              = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const environmentsFile  = path.join(__dirname, '/environments.json');

const config = {

  // set the context (optional)
  context: path.join(__dirname, '/app'),
  entry: {
    app: 'app.js',
    vendor: ['angular', 'angular-ui-router'],
  },

  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      template: 'app/index.html',
    }),
  ],

  // enable loading modules relatively (without the ../../ prefix)
  resolve: {
    root: [path.join(__dirname, '/app')],
  },

  module: {
    preLoaders: [
      {
        test: /\.*/,
        loaders: [
          `env-replace?prefix=@@&file=${environmentsFile}`
        ]
      }
    ],
    loaders: [

      // Transpile ES6 and annotate AngularJS dependencies
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [
          'ng-annotate',
          'babel'
        ]
      },

      // SCSS
      {
        test: /\.s?css$/,
        loaders: [
          'style',
          'css',
          'autoprefixer',
          `sass?includePaths[]=${path.join(__dirname, '/app')}`
        ]
      },

      // JSON
      {
        test: /\.json$/,
        loader: 'json'
      },

      // Fonts and images
      {
        test: /\.(ttf|eot|svg|otf|png)$/,
        loader: 'file'
      },
      {
        test: /\.(png)$/,
        loader: 'url?mimetype=image/png'
      },
      {
        test: /\.woff(2)?$/,
        loader: 'url?limit=10000&minetype=application/font-woff'
      },

      // Create AngularJS templates from HTMLs
      {
        test: /\.html$/,
        loaders: [
          `ngtemplate?relativeTo=${path.join(__dirname, '/app')}`,
          'html'
        ]
      }
    ]
  },

  devServer: {
    contentBase: './app',
    noInfo: false,
    hot: true,
    inline: true,
    historyApiFallback: true
  }

};

if (process.env.NODE_ENV === 'development') {
  config.devtool = '#inline-source-map';
}

if (process.env.NODE_ENV !== 'test') {
  config.plugins.push(
    new webpack.optimize.CommonsChunkPlugin(
      /* chunkName: */ 'vendor',
      /* filename: */ 'vendor.[hash].js'
    )
  );
}

module.exports = config;
