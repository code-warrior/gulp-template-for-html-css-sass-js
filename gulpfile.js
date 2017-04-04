/*jslint node: true */

'use strict';

var gulp             = require('gulp'),
    HTMLValidator    = require('gulp-html'),

    HTMLFiles = ['dev/html/*.html',
                 'dev/html/**/*.html'];

gulp.task('validateHTML', function () {
    return gulp.src(HTMLFiles)
        .pipe(HTMLValidator());
});
