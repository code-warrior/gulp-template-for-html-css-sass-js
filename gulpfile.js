/*jslint node: true */

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSpecificPrefixer = require('gulp-autoprefixer'),
    htmlValidator = require('gulp-html'),
    jsConcatenator = require('gulp-concat'),
    jsLinter = require('gulp-eslint'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

gulp.task('validateHTML', function () {
    'use strict';

    return gulp.src(['dev/html/*.html', 'dev/html/**/*.html'])
        .pipe(htmlValidator());
});

gulp.task('compileCSSForDev', function () {
    'use strict';

    return gulp.src('dev/styles/00-main-dev/main.scss')
        .pipe(sass({
            outputStyle: 'expanded',
            precision: 10
        }).on('error', sass.logError))
        .pipe(browserSpecificPrefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('temp/styles'));
});

gulp.task('compileJSForDev', function () {
    'use strict';

    return gulp.src('dev/scripts/*.js')
        .pipe(jsConcatenator('main.js'))
        .pipe(gulp.dest('temp/scripts'));
});

gulp.task('lintJS', function () {
    'use strict';

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
        //
        // “To have the process exit with an error code (1) on lint error, return
        // the stream and pipe to failAfterError last.”
        //
        //     — https://github.com/adametry/gulp-eslint
        //
        .pipe(jsLinter.failAfterError());
});

gulp.task('serve', ['compileCSSForDev', 'compileJSForDev', 'lintJS', 'validateHTML'], function () {
    'use strict';

    browserSync({
        notify: true,
        port: 9000,
        reloadDelay: 100,
        server: {
            baseDir: [
                'temp/',
                'dev/',
                'dev/html'
            ]
        }
    });

    gulp.watch('dev/scripts/*.js', ['compileJavaScriptForDev', 'lintJS'])
        .on('change', reload);

    gulp.watch('dev/styles/**/*.scss', ['compileCSSForDev'])
        .on('change', reload);

    gulp.watch(['dev/html/**/*.html'], ['validateHTML'])
        .on('change', reload);

    gulp.watch('dev/img/**/*')
        .on('change', reload);
});
