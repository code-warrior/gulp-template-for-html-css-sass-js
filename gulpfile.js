/*jslint node: true */

'use strict';

var gulp             = require('gulp'),
    HTMLMinifier     = require('gulp-htmlmin'),
    devSourceFolder  = 'dev',
    htmlSourceFolder = 'html',
    prodTargetFolder = 'prod',

    HTMLFiles = [devSourceFolder + '/' + htmlSourceFolder + '/*.html',
                 devSourceFolder + '/' + htmlSourceFolder + '/**/*.html'];

gulp.task('compressHTML', function() {
    return gulp.src(HTMLFiles)
        .pipe(HTMLMinifier({
            removeComments: true,
            collapseWhitespace: true
        }))
        .pipe(gulp.dest(prodTargetFolder));
});
