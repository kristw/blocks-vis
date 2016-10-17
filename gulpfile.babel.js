'use strict';

const del  = require('del');
const gulp = require('gulp');

import {copyJson, copy, compileHtml} from './tasks/common.js';
import {compileSass} from './tasks/sass.js';
import {compileHtmlEjs} from './tasks/ejs.js';
import {compileImage} from './tasks/image.js';
import {compileExecutable} from './tasks/webpack.js';
import {createBuildAndWatchTasks} from './tasks/core.js';
import {createBrowserSyncTask} from './tasks/browserSync.js';

// -------------------------------------------
// Configuration
// -------------------------------------------

const paths = {
  src:   __dirname + '/src',
  dist:  __dirname + '/dist',
  node_modules: __dirname + '/src/node_modules_components'
};

const patterns = {
  js     : paths.src + '/app/**/*.@(js|jsx)',
  node_modules  : paths.src + '/node_modules/**/*.@(css|png|jpg|jpeg|tiff|gif|woff|woff2|ttf|otf|svg)',
  sass   : paths.src + '/app/**/*.scss',
  json   : paths.src + '/@(data|app)/**/*.json',
  data   : paths.src + '/data/**/*.!(json)',
  images : paths.src + '/@(images|app)/**/*.@(png|gif|jpg|jpeg|tiff|svg)',
  fonts  : paths.src + '/fonts/**/*',
  html   : paths.src + '/*.html',
  ejs    : paths.src + '/[^_]*.ejs',
  // ngtemplates : paths.src + '/app/**/*.html'
};

// -------------------------------------------
// Main tasks
// -------------------------------------------

gulp.task('clean' ,() => del([paths.dist + '/**/*']));
gulp.task('json'  ,copy(patterns.json , paths.dist));
gulp.task('data'  ,copy(patterns.data , paths.dist + '/data'));
gulp.task('fonts' ,copy(patterns.fonts, paths.dist + '/fonts'));
gulp.task('node_modules' ,copy(patterns.node_modules, paths.dist + '/node_modules_components'));
gulp.task('html'  ,compileHtml(patterns.html, paths.dist));
gulp.task('ejs'   ,compileHtmlEjs(patterns.ejs, paths.dist));
gulp.task('sass'  ,compileSass(patterns.sass, paths.dist + '/app'));
gulp.task('images',compileImage(patterns.images, paths.dist));

// gulp.task('webpack', compileExecutable(
//   paths.src + '/app/main*.js',
//   paths.dist + '/app'
// ));

const buildTasks = [
  'node_modules',
  'sass',
  'json',
  'data',
  'images',
  'fonts',
  'html',
  'ejs',
  // 'ngtemplates',
]
.map(name => {return {name, pattern: patterns[name]}});
// .concat([{name: 'webpack', pattern: patterns.js}]);

createBuildAndWatchTasks(buildTasks);
createBrowserSyncTask();

gulp.task('dev', ['watch', 'browser-sync']);
gulp.task('default', ['dev']);
