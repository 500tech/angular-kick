var config = {

  // set the context (optional)
  context: __dirname + '/app',
  entry: 'app.js',

  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },

  // enable loading modules relatively (without the ../../ prefix)
  resolve: {
    root: [__dirname + '/app']
  },

  module: {
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
  }

};

if (process.env.NODE_ENV === 'development') {
  config.devtool = '#inline-source-map';

  config.devServer = {
    contentBase: './app',
      noInfo: false,
      hot: true
  }
}

module.exports = config;