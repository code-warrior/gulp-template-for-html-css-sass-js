/*jslint node: true */

var gulp = require('gulp');

gulp.task('compileCSSForProd', function () {
    'use strict';

    var sass = require('gulp-sass'),
        cssCompressor = require('gulp-csso'),
        browserSpecificPrefixer = require('gulp-autoprefixer');

    return gulp.src('dev/styles/00-main-prod/main.scss')
        .pipe(sass({
            outputStyle: 'compressed',
            precision: 10
        }).on('error', sass.logError))
        .pipe(browserSpecificPrefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(cssCompressor())
        .pipe(gulp.dest('prod/styles/'));
});
