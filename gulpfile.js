/*jslint node: true */

var gulp                           = require('gulp'),
    sass                           = require('gulp-sass'),
    cssCompressor                  = require('gulp-csso'),
    browserSpecificPrefixGenerator = require('gulp-autoprefixer');

gulp.task('compileCSSForProd', function () {
    'use strict';

    return gulp.src('dev/styles/00-main-prod/main.scss')
        .pipe(sass({
            outputStyle: 'compressed',
            precision: 10
        }).on('error', sass.logError))
        .pipe(browserSpecificPrefixGenerator({
            browsers: ['last 2 versions']
        }))
        .pipe(cssCompressor())
        .pipe(gulp.dest('prod/styles/'));
});
