/*jslint node: true */

'use strict';

var gulp             = require('gulp'),
    JSConcatenator   = require('gulp-concat'),
    JSLinter         = require('gulp-eslint'),

    // Folder name variables
    devSourceFolder  = 'dev',
    devTargetFolder  = 'temp',
    prodTargetFolder = 'prod',
    JSFolder         = 'scripts',

    // Filenames
    JSTargetFilename = 'main.js',

    preCompiledJSFilesWithoutGrid = [
        devSourceFolder + '/' + JSFolder + '/*.js',
        '!' + devSourceFolder + '/' + JSFolder + '/grid.js'
    ];

gulp.task('lintJS', function () {
    return gulp.src(preCompiledJSFilesWithoutGrid)
        .pipe(JSConcatenator(JSTargetFilename))
        .pipe(JSLinter({
            'rules': {
                'indent': [
                    2,
                    4
                ],
                'quotes': [
                    2,
                    'single'
                ],
                'linebreak-style': [
                    2,
                    'unix'
                ],
                'semi': [
                    2,
                    'always'
                ],
                'max-len': [
                    2,
                    85,
                    4
                ]
            },
            'env': {
                'node': true,
                'browser': true
            },
            'extends': 'eslint:recommended'
        }))
        .pipe(JSLinter.formatEach('compact', process.stderr))
        //
        // “To have the process exit with an error code (1) on lint error, return
        // the stream and pipe to failAfterError last.”
        //
        //     — https://github.com/adametry/gulp-eslint
        //
        .pipe(JSLinter.failAfterError())
        .pipe(gulp.dest(prodTargetFolder + '/' + JSFolder));
});
