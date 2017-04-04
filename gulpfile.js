/*jslint node: true */

var gulp = require('gulp');

gulp.task('compileJSForProd', function () {
    'use strict';

    var jsConcatenator = require('gulp-concat'),
        jsCompressor = require('gulp-uglify');

    return gulp.src([
        'dev/scripts/*.js',
        '!dev/scripts/grid.js'
    ])
        .pipe(jsConcatenator('main.js'))
        .pipe(jsCompressor())
        .pipe(gulp.dest('prod/scripts'));
});
