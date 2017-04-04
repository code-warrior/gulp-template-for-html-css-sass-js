/*jslint node: true */

'use strict';

var gulp             = require('gulp'),
    HTMLValidator    = require('gulp-html'),

    devSourceFolder  = 'dev',
    htmlSourceFolder = 'html',

    HTMLFiles = [devSourceFolder + '/' + htmlSourceFolder + '/*.html',
                 devSourceFolder + '/' + htmlSourceFolder + '/**/*.html'];

gulp.task('validateHTML', function () {
    return gulp.src(HTMLFiles)
        .pipe(HTMLValidator());
});
