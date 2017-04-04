/*jslint node: true */

var gulp = require('gulp');

gulp.task('compressHTML', function () {
    'use strict';

    var htmlMinifier = require('gulp-htmlmin');

    return gulp.src(['dev/html/*.html', 'dev/html/**/*.html'])
        .pipe(htmlMinifier({
            removeComments: true,
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('prod'));
});
