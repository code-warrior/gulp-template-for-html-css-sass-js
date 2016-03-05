/*jslint node: true */

'use strict';

var gulp                           = require('gulp'),
    sass                           = require('gulp-sass'),
    CSSCompressor                  = require('gulp-csso'),
    browserSpecificPrefixGenerator = require('gulp-autoprefixer'),
    devSourceFolder                = 'dev',
    prodTargetFolder               = 'prod',
    sassCSSFolder                  = 'styles',
    cssProdDestinationFolder       = prodTargetFolder + '/' + sassCSSFolder + '/',
    sassSourceFileForProd          = devSourceFolder  + '/' + sassCSSFolder +
                                     '/00-main-prod/main.scss';

gulp.task('compileCSSForProd', function () {
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
