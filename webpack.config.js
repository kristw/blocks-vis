'use strict';

var webpack = require('webpack');
var path = require('path');

// Detect environment
var isProduction = process.env.NODE_ENV === 'production';

// Create config
var config = {
  entry: {
    'main': './src/app/main.js'
  },
  output: {
    path: path.join(__dirname, 'dist/app'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['react', 'es2015'],
          plugins: ['transform-object-assign']
        }
      }
    ]
  },
  plugins: [],
  devtool: isProduction ? undefined : 'eval'
};

if (isProduction) {
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  );
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      report: 'min',
      compress: true,
      preserveComments: false,
      // mangle: false,
      mangle: {
        except: ['$super', '$', 'exports', 'require']
      }
    })
  );
}

module.exports = config;
