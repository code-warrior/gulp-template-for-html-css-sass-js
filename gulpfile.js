/*jslint node: true */

var gulp                           = require('gulp'),
    sass                           = require('gulp-sass'),
    CSSCompressor                  = require('gulp-csso'),
    browserSpecificPrefixGenerator = require('gulp-autoprefixer'),
    prodTargetFolder               = 'prod',
    sassCSSFolder                  = 'styles',
    cssProdDestinationFolder       = prodTargetFolder + '/' + sassCSSFolder + '/',
    sassSourceFileForProd          = 'dev'  + '/' + sassCSSFolder +
                                     '/00-main-prod/main.scss';

gulp.task('compileCSSForProd', function () {
    'use strict';

    return gulp.src(sassSourceFileForProd)
        .pipe(sass({
            outputStyle: 'compressed',
            precision: 10
        }).on('error', sass.logError))
        .pipe(browserSpecificPrefixGenerator({
            browsers: ['last 2 versions']
        }))
        .pipe(CSSCompressor())
        .pipe(gulp.dest(cssProdDestinationFolder));
});
