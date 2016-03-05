/*jslint node: true */

'use strict';

var gulp                           = require('gulp'),
    sass                           = require('gulp-sass'),
    browserSpecificPrefixGenerator = require('gulp-autoprefixer'),
    devSourceFolder                = 'dev',
    devTargetFolder                = 'temp',
    sassCSSFolder                  = 'styles',
    sassSourceFileForDev           = devSourceFolder + '/' + sassCSSFolder +
                                     '/00-main-dev/main.scss',
    cssDevDestinationFolder        = devTargetFolder + '/' + sassCSSFolder +
                                     '/';

gulp.task('compileCSSForDev', function () {
    return gulp.src(sassSourceFileForDev)
        .pipe(sass({
            outputStyle: 'expanded',
            precision: 10
        }).on('error', sass.logError))
        .pipe(browserSpecificPrefixGenerator({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest(cssDevDestinationFolder));
});
