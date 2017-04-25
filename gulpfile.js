/*jslint node: true */

var gulp = require('gulp');

gulp.task('lintJS', function () {
    'use strict';

    var jsConcatenator = require('gulp-concat'),
        jsLinter = require('gulp-eslint');

    return gulp.src('dev/scripts/*.js')
        .pipe(jsConcatenator('main.js'))
        .pipe(jsLinter({
            rules: {
                indent: [2, 4],
                quotes: [2, 'single'],
                'linebreak-style': [2, 'unix'],
                semi: [2, 'always'],
                'max-len': [2, 85, 4]
            },
            env: {
                node: true,
                browser: true
            },
            extends: 'eslint:recommended'
        }))
        .pipe(jsLinter.formatEach('compact', process.stderr))
        .pipe(jsLinter.failAfterError())
        .pipe(gulp.dest('prod/scripts'));
});
