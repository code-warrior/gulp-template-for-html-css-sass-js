/*jslint node: true */


var gulp             = require('gulp'),
    HTMLValidator    = require('gulp-html'),

    HTMLFiles = ['dev/html/*.html',
                 'dev/html/**/*.html'];

gulp.task('validateHTML', function () {
    'use strict';

    return gulp.src(HTMLFiles)
        .pipe(HTMLValidator());
});
