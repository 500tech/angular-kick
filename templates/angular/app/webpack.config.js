/* global __dirname, process */

const webpack           = require('webpack');
const path              = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin       = require('clean-webpack-plugin');
const environmentsFile  = path.join(__dirname, '/environments.json');
const appPath           = path.join(__dirname, '/app');
const distPath          = path.join(__dirname, '/dist');
const exclude           = /node_modules/;

const config = {

  // The base directory for resolving `entry` (must be absolute path)
  context: appPath,

  entry: {
    app: 'app.js',
    vendor: [
      'angular',
      'angular-ui-router'
    ]
  },

  output: {
    path: distPath,
    publicPath: '/',
    filename: 'bundle.[hash].js'
  },

  plugins: [
    // Generate index.html with included script tags
    new HtmlWebpackPlugin({
      inject: 'body',
      template: 'app/index.html',
    }),

    // Remove build related folders
    new CleanPlugin(['dist']),
  ],

  // Enable loading modules relatively (without the ../../ prefix)
  resolve: {
    root: [appPath]
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
        loaders: [
          'ng-annotate',
          'babel'
        ],
        exclude
      },

      // SCSS
      {
        test: /\.(css|scss)$/,
        loaders: [
          'style',
          'css',
          'autoprefixer',
          `sass?includePaths[]=${appPath}`
        ]
      },

      // JSON
      {
        test: /\.json$/,
        loader: 'json',
        exclude
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
          `ngtemplate?relativeTo=${appPath}`,
          'html'
        ]
      }
    ]
  },

  // Settings for webpack-dev-server
  // `--hot` and `--progress` must be set using CLI
  devServer: {
    contentBase: './app',
    colors: true,
    noInfo: true,
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
