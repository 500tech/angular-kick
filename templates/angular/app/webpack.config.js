var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var config = {

  // set the context (optional)
  context: __dirname + '/app',
  entry: {
    app: 'app.js',
    vendor: ['angular', 'angular-ui-router']
  },

  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin(/* chunkName: */'vendor', /* filename: */'vendor.[hash].js'),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: 'app/index.html'
    })
  ],

  // enable loading modules relatively (without the ../../ prefix)
  resolve: {
    root: [__dirname + '/app']
  },

  module: {
    preLoaders: [
      {
        test: /\.*/,
        loaders: ['env-replace?prefix=@@&file=' + __dirname + '/environments.json']
      }
    ],
    loaders: [
      // Transpile ES6 and annotate AngularJS dependencies
      { test: /\.js$/, exclude: /node_modules/, loaders: ['ng-annotate', 'babel'] },

      // SCSS
      { test: /\.s?css$/, loader: 'style!css!autoprefixer!sass?' + 'includePaths[]=' + __dirname + '/app'},

       //JSON
      { test: /\.json$/, loader: 'json' },

      // Fonts and images
      { test: /\.(ttf|eot|svg|otf|png)$/, loader: 'file' },
      { test: /\.(png)$/, loader: 'url?mimetype=image/png' },
      { test: /\.woff(2)?$/, loader: 'url?limit=10000&minetype=application/font-woff'},

      // Create AngularJS templates from HTMLs
      {
        test: /\.html$/,
        loaders: ['ngtemplate?relativeTo=' + __dirname + '/app', 'html']
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

module.exports = config;
