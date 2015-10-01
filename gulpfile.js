/*jslint
    node: true */

'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var uglify = require('gulp-uglify');

gulp.task('styles', function () {
    return gulp.src('app/styles/main.scss')
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass({
            outputStyle: 'compressed',
            precision: 10,
            includePaths: ['.'],
            onError: console.error.bind(console, '\n\nSass error:\n\n')
        }))
        .pipe(plugins.postcss([
            require('autoprefixer-core')({browsers: ['last 1 version']})
        ]))
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest('.tmp/styles'))
        .pipe(reload({stream: true}));
});
