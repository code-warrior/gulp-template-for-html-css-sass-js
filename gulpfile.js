/*jslint node: true */

'use strict';

var gulp                   = require('gulp'),
    JSConcatenator         = require('gulp-concat'),
    devSourceFolder        = 'dev',
    devTargetFolder        = 'temp',
    JSFolder               = 'scripts',
    JSTargetFilename       = 'main.js',
    preConcatenatedJSFiles = devSourceFolder + '/' + JSFolder + '/*.js',
    JSDevTargetFolder      = devTargetFolder + '/' + JSFolder;

gulp.task('compileJSForDev', function () {
    return gulp.src(preConcatenatedJSFiles)
        .pipe(JSConcatenator(JSTargetFilename))
        .pipe(gulp.dest(JSDevTargetFolder));
});
