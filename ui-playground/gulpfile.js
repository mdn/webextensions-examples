'use strict';

/* Modules. */

var gulp = require('gulp');
var meta = require('./package.json');

// Gulp modules.
var babel = require('gulp-babel');
var merge = require('merge-stream');
var sourcemaps = require('gulp-sourcemaps');
var sync = require('gulp-config-sync');
var zip = require('gulp-zip');


/* Variables */

var sourceFiles = ['lib/*'];
var htmlFiles = ['html/*'];
var imageFiles = ['images/*'];
var soundFiles = ['sounds/*'];
var xpiName = meta.name + '.xpi';
var dist = 'dist/';


/* Tasks. */

gulp.task('other', function () {
  var manifest = gulp.src('manifest.json')
    .pipe(sync({fields: [
      {'from': 'shortName', 'to': 'name'},
      'version',
      'description',
      'author',
      'contributors',
      {'from': 'homepage', 'to': 'homepage_url'}
    ]}));
  var es = gulp.src(sourceFiles);
  var js = gulp.src(sourceFiles)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write());
  var html = gulp.src(htmlFiles);
  var images = gulp.src(imageFiles, {'base': './'});
  var sounds = gulp.src(soundFiles, {'base': './'});

  // Firefox can handle ES6.
  merge(manifest, es, html, images, sounds)
    .pipe(zip(xpiName))
    .pipe(gulp.dest(dist));

  // Chrome needs a transpiler.
  merge(manifest, js, html, images, sounds)
    .pipe(gulp.dest(dist));
});

gulp.task('deploy', ['other'], function () {
  gulp.src(dist + xpiName)
    .pipe(gulp.dest('/Users/bwinton/Dropbox/Public/Firefox/WebExtensions/'));
});

gulp.task('default', ['other']);
