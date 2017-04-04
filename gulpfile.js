/*jslint node: true */

var gulp = require('gulp');

gulp.task('compileJSForDev', function () {
    'use strict';

    var concatenateJS = require('gulp-concat');

    return gulp.src('dev/scripts/*.js')
        .pipe(concatenateJS('main.js'))
        .pipe(gulp.dest('temp/scripts'));
});
