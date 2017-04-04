/*jslint node: true */

var gulp = require('gulp'),
    htmlValidator = require('gulp-html'),
    htmlFiles = ['dev/html/*.html', 'dev/html/**/*.html'];

gulp.task('validateHTML', function () {
    'use strict';

    return gulp.src(htmlFiles)
        .pipe(htmlValidator());
});
