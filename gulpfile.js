/*jslint node: true */

'use strict';

    // Gulp plugins
var gulp                           = require('gulp'),
    sass                           = require('gulp-sass'),
    browserSpecificPrefixGenerator = require('gulp-autoprefixer'),
    HTMLValidator                  = require('gulp-html'),
    JSConcatenator                 = require('gulp-concat'),
    JSLinter                       = require('gulp-eslint'),
    browserSync                    = require('browser-sync'),
    reload                         = browserSync.reload,

    // Folder name variables
    devSourceFolder                = 'dev/',
    devTargetFolder                = 'temp/',
    HTMLSourceFolder               = 'html',
    JSFolder                       = 'scripts',
    imagesFolder                   = 'img',
    sassCSSFolder                  = 'styles',

    // Filenames
    JSTargetFilename               = 'main.js',

    preCompiledJSFilesWithGrid    = devSourceFolder + JSFolder + '/*.js',
    preCompiledJSFilesWithoutGrid = [
        devSourceFolder + JSFolder + '/*.js',
        '!' + devSourceFolder + JSFolder + '/grid.js'
    ],

    HTMLFiles = [
        devSourceFolder + HTMLSourceFolder + '/*.html',
        devSourceFolder + HTMLSourceFolder + '/**/*.html'
    ],

    sassSourceFileForDev     = devSourceFolder  + '/' + sassCSSFolder +
    JSDevTargetFolder        = devTargetFolder  + JSFolder,
    cssDevDestinationFolder  = devTargetFolder  + sassCSSFolder + '/',
        '/00-main-dev/main.scss';

gulp.task('validateHTML', function () {
    return gulp.src(HTMLFiles)
        .pipe(HTMLValidator());
});

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

gulp.task('compileJSForDev', function () {
    return gulp.src(preCompiledJSFilesWithGrid)
        .pipe(JSConcatenator(JSTargetFilename))
        .pipe(gulp.dest(JSDevTargetFolder));
});

gulp.task('lintJS', function () {
    return gulp.src(preCompiledJSFilesWithoutGrid)
        .pipe(JSConcatenator(JSTargetFilename))
        .pipe(JSLinter({
            'rules': {
                'indent': [2, 4],
                'quotes': [2, 'single'],
                'linebreak-style': [2, 'unix'],
                'semi': [2, 'always'],
                'max-len': [2, 85, 4]
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
        .pipe(JSLinter.failAfterError());
});

gulp.task('serve',
    [
        'compileCSSForDev',
        'compileJSForDev',
        'lintJS',
        'validateHTML'
    ],
    function () {
        browserSync({
            notify: true,
            port: 9000,
            reloadDelay: 100,
            server: {
                baseDir: [
                    devTargetFolder,
                    devSourceFolder,
                    devSourceFolder + HTMLSourceFolder
                ]
            }
        });

        gulp.watch(devSourceFolder + JSFolder + '/*.js',
            ['compileJavaScriptForDev', 'lintJS']).on(
            'change',
            reload
        );

        gulp.watch(devSourceFolder + imagesFolder + '/**/*').on(
            'change',
            reload
        );

        gulp.watch([devSourceFolder + HTMLSourceFolder + '/**/*.html'],
            ['validateHTML']).on(
            'change',
            reload
        );

        gulp.watch(devSourceFolder + sassCSSFolder + '/**/*.scss',
            ['compileCSSForDev']).on(
            'change',
            reload
        );
    });
