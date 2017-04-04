/*jslint node: true */

var gulp = require('gulp');

gulp.task('validateHTML', function () {
    'use strict';

    var htmlValidator = require('gulp-html');

    return gulp.src(['dev/html/*.html', 'dev/html/**/*.html'])
        .pipe(htmlValidator());
});
