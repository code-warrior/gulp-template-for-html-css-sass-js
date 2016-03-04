/*jslint node: true */

'use strict';

var gulp                           = require('gulp'),
    del                            = require('del'),
    sass                           = require('gulp-sass'),
    CSSCompressor                  = require('gulp-csso'),
    browserSpecificPrefixGenerator = require('gulp-autoprefixer'),
    HTMLMinifier                   = require('gulp-htmlmin'),
    HTMLValidator                  = require('gulp-html'),
    JSConcatenator                 = require('gulp-concat'),
    JSLinter                       = require('gulp-eslint'),
    JSCompressor                   = require('gulp-uglify'),
    imageCompressor                = require('gulp-imagemin'),
    tempCache                      = require('gulp-cache'),
    browserSync                    = require('browser-sync'),
    reload                         = browserSync.reload,
    expendableFolders              = ['temp', 'prod'];

gulp.task('validateHTML', function () {
    return gulp.src(['dev/html/*.html','dev/html/**/*.html'])
        .pipe(HTMLValidator());
});

gulp.task('compressHTML', function() {
    return gulp.src(['dev/html/*.html','dev/html/**/*.html'])
        .pipe(HTMLMinifier({
            removeComments: true,
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('prod'));
});

gulp.task('compileCSSForDev', function () {
    return gulp.src('dev/styles/00-main-dev/main.scss')
        .pipe(sass({
            outputStyle: 'expanded',
            precision: 10
        }).on('error', sass.logError))
        .pipe(browserSpecificPrefixGenerator({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('temp/styles/'));
});

gulp.task('compileCSSForProd', function () {
    return gulp.src('dev/styles/00-main-prod/main.scss')
        .pipe(sass({
            outputStyle: 'compressed',
            precision: 10
        }).on('error', sass.logError))
        .pipe(browserSpecificPrefixGenerator({
            browsers: ['last 2 versions']
        }))
        .pipe(CSSCompressor())
        .pipe(gulp.dest('prod/styles/'));
});

gulp.task('compileJSForDev', function () {
    return gulp.src('dev/scripts/*.js')
        .pipe(JSConcatenator('app.js'))
        .pipe(gulp.dest('temp/scripts'));
});

gulp.task('compileJSForProd', function () {
    return gulp.src(['dev/scripts/*.js','!dev/scripts/grid.js'])
        .pipe(JSConcatenator('app.js'))
        .pipe(JSCompressor())
        .pipe(gulp.dest('prod/scripts'));
});

gulp.task('lintJS', function () {
    return gulp.src(['dev/scripts/*.js','!dev/scripts/grid.js'])
        .pipe(JSConcatenator('app.js'))
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

gulp.task('compressThenCopyImagesToProdFolder', function () {
    return gulp.src('dev/img/**/*')
        .pipe(tempCache(
            imageCompressor({
                optimizationLevel: 3, // For PNG files. Accepts 0 – 7; 3 is default.
                progressive: true,    // For JPG files.
                multipass: false,     // For SVG files. Set to true for compression.
                interlaced: false     // For GIF files. Set to true for compression.
            })
        ))
        .pipe(gulp.dest('prod/img'));
});

gulp.task('copyUnprocessedAssetsToProdFolder', function () {
    return gulp.src([
        'dev/*.*',       // Source all files,
        'dev/**',        // and all folders, but
        '!dev/img',      // ignore images;
        '!dev/**/*.js',  // ignore JS;
        '!dev/styles/**' // ignore Sass/CSS.
    ], {dot: true}).pipe(gulp.dest('prod'));
});

gulp.task('build',
    [
        'validateHTML',
        'compressHTML',
        'compileCSSForProd',
        'lintJS',
        'compileJSForProd',
        'compressThenCopyImagesToProdFolder',
        'copyUnprocessedAssetsToProdFolder'
    ]);

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
                baseDir: ['temp', 'dev', 'dev/html']
            }
        });

        gulp.watch('dev/scripts/*.js', ['compileJavaScriptForDev', 'lintJS'])
            .on('change', reload);
        gulp.watch('dev/img/**/*')
            .on('change', reload);
        gulp.watch(['dev/html/**/*.html'], ['validateHTML'])
            .on('change', reload);
        gulp.watch('dev/styles/**/*.scss', ['compileCSSForDev'])
            .on('change', reload);
    });

gulp.task('clean', function () {
    var fs = require('fs');

    for (var i = 0; i < expendableFolders.length; i++ ) {
        try {
            fs.accessSync(expendableFolders[i], fs.F_OK);
            process.stdout.write('\n\tThe ' + expendableFolders[i] +
                ' directory was found and will be deleted.\n');
            del(expendableFolders[i]);
        } catch (e) {
            process.stdout.write('\n\tThe ' + expendableFolders[i] +
                ' directory does NOT exist or is NOT accessible.\n');
        }
    }

    process.stdout.write('\n');
});

gulp.task('default', function () {
    process.stdout.write('\n\tThis default gulp task does nothing except generate ' +
        'this message.\n\tRun “gulp --tasks” to see the available tasks.\n\n');
});
