/*jslint node: true */

var gulp = require('gulp');

gulp.task('compileCSSForDev', function () {
    'use strict';

    var sass = require('gulp-sass'),
        browserSpecificPrefixGenerator = require('gulp-autoprefixer');

    return gulp.src('dev/styles/00-main-dev/main.scss')
        .pipe(sass({
            outputStyle: 'expanded',
            precision: 10
        }).on('error', sass.logError))
        .pipe(browserSpecificPrefixGenerator({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('temp/styles/'));
});
