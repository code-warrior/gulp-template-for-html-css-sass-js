/*jslint node: true */

'use strict';

var gulp                               = require('gulp'),
    JSConcatenator                     = require('gulp-concat'),
    compressJS                         = require('gulp-uglify'),
    devSourceFolder                    = 'dev',
    prodTargetFolder                   = 'prod',
    JSFolder                           = 'scripts',
    JSTargetFilename                   = 'main.js',
    JSProdTargetFolder                 = prodTargetFolder + '/' + JSFolder,
    preConcatenatedJSFilesWithoutGrid  = [
        devSourceFolder + '/' + JSFolder + '/*.js',
        '!' + devSourceFolder + '/' + JSFolder + '/grid.js'
    ];

gulp.task('compileJSForProd', function () {
    return gulp.src(preConcatenatedJSFilesWithoutGrid)
        .pipe(JSConcatenator(JSTargetFilename))
        .pipe(compressJS())
        .pipe(gulp.dest(JSProdTargetFolder));
});
