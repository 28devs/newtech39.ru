(function () {
  'use strict';

  const gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    del = require('del'),
    notify = require('gulp-notify'),
    concat = require('gulp-concat'),
    concatCss = require('gulp-concat-css'),
    uglifyJs = require('gulp-uglifyes'),
    uglifycss = require('gulp-uglifycss'),
    pug = require('gulp-pug'),
    browserSync = require('browser-sync').create()
    // lib = require('bower-files')({
    //   overrides: {
    //     bootstrap: {
    //       main: ['./dist/js/bootstrap.min.js', './dist/css/bootstrap.min.css'],
    //       dependencies: {}
    //     }			
    //   }
    // });

  //write html by pug
  gulp.task('views', function buildHTML() {
    return gulp.src('app/assets/views/*.pug')
      .pipe(pug({
        'pretty': true
      }))
      .pipe(gulp.dest('dest/'));
  });

  //write style
  gulp.task('sass', function () {
    return gulp.src('app/styles/sass/main.scss')
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', notify.onError()))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('dest/styles'));
  });
  gulp.task('css', function () {
    return gulp.src('app/styles/css/*.*')
      .pipe(gulp.dest('dest/styles/'));
  });

  //libs
  // gulp.task('libs-js', function () {
  //   return gulp.src(lib.ext('js').files)
  //     .pipe(concat('lib.min.js'))
  //     .pipe(uglifyJs({
  //       warnings: true,
  //       ecma: 8
  //     }))
  //     .pipe(gulp.dest('dest/scripts'));
  // });
  // gulp.task('libs-css', function () {
  //   return gulp.src(lib.ext('css').files)
  //     .pipe(concatCss('styles/libs.min.css'))
  //     .pipe(uglifycss({
  //       'maxLineLen': 80,
  //       'uglyComments': true
  //     }))
  //     .pipe(gulp.dest('dest/'));
  // });

  // write js
  gulp.task('scripts', function () {
    return gulp.src('app/scripts/**')
      .pipe(gulp.dest('dest/scripts'));
  });

  //delete dest folder
  gulp.task('clean', function () {
    return del('dest');
  });

  //copy all assets files
  gulp.task('assets', function () {
    return gulp.src('app/assets/**', {
      since: gulp.lastRun('assets')
    })
      .pipe(gulp.dest('dest'));
  });

  //task for styles together
  // gulp.task('styles', gulp.parallel('sass', 'css');

  //task for scripts together
  // gulp.task('scripts', gulp.series('libs-js', 'js'));

  //run task for build once
  gulp.task('build', gulp.series('clean', gulp.parallel('sass', 'views', 'css', 'libs-css', 'libs-js', 'assets', 'scripts')));

  //up static server; watching change in dest and reload page
  gulp.task('server', function () {
    browserSync.init({
      server: 'dest'
    });

    browserSync.watch('dest/**/*.*').on('change', browserSync.reload);
  });

  //watching by all files in dest
  gulp.task('watch', function () {
    gulp.watch('app/styles/css/**/*.*', gulp.series('css'));
    gulp.watch('app/styles/sass/**/*.*', gulp.series('sass'));
    gulp.watch('app/scripts/**/*.*', gulp.series('scripts'));
    gulp.watch('app/assets/**/*.*', gulp.series('assets'));
    gulp.watch('app/assets/views/**/*.*', gulp.series('views'));
    // gulp.watch('app/libs/**/*.*', gulp.parallel('libs-js','libs-css'));
  });

  gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'server')));

}());