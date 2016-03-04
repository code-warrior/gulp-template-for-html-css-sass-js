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
    devSourceFolder                = 'dev',
    devTargetFolder                = 'temp',
    prodTargetFolder               = 'prod',
    HTMLSourceFolder               = 'html',
    JSFolder                       = 'scripts',
    imagesFolder                   = 'img',
    sassCSSFolder                  = 'styles',
    JSTargetFilename               = 'app.js',
    preCompiledJSFilesWithGrid     = devSourceFolder + '/' + JSFolder + '/*.js',
    preCompiledJSFilesWithoutGrid  = [
        devSourceFolder + '/' + JSFolder + '/*.js',
        '!' + devSourceFolder + '/' + JSFolder + '/grid.js'
    ],
    HTMLFiles = [
        devSourceFolder + '/' + HTMLSourceFolder + '/*.html',
        devSourceFolder + '/' + HTMLSourceFolder + '/**/*.html'
    ],
    sassSourceFileForDev     = devSourceFolder  + '/' + sassCSSFolder +
                                   '/00-main-dev/main.scss',
    sassSourceFileForProd    = devSourceFolder + '/' + sassCSSFolder +
                                   '/00-main-prod/main.scss',
    expendableFolders        = [devTargetFolder, prodTargetFolder],
    JSDevTargetFolder        = devTargetFolder  + '/' + JSFolder,
    JSProdTargetFolder       = prodTargetFolder + '/' + JSFolder,
    cssDevDestinationFolder  = devTargetFolder  + '/' + sassCSSFolder + '/',
    cssProdDestinationFolder = prodTargetFolder + '/' + sassCSSFolder + '/';

gulp.task('validateHTML', function () {
    return gulp.src(HTMLFiles)
        .pipe(HTMLValidator());
});

gulp.task('compressHTML', function() {
    return gulp.src(HTMLFiles)
        .pipe(HTMLMinifier({
            removeComments: true,
            collapseWhitespace: true
        }))
        .pipe(gulp.dest(prodTargetFolder));
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

gulp.task('compileJSForDev', function () {
    return gulp.src(preCompiledJSFilesWithGrid)
        .pipe(JSConcatenator(JSTargetFilename))
        .pipe(gulp.dest(JSDevTargetFolder));
});

gulp.task('compileJSForProd', function () {
    return gulp.src(preCompiledJSFilesWithoutGrid)
        .pipe(JSConcatenator(JSTargetFilename))
        .pipe(JSCompressor())
        .pipe(gulp.dest(JSProdTargetFolder));
});

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
        .pipe(JSLinter.failAfterError());
});

gulp.task('compressThenCopyImagesToProdFolder', function () {
    return gulp.src(devSourceFolder + '/' + imagesFolder + '/**/*')
        .pipe(tempCache(
            imageCompressor({
                optimizationLevel: 3, // For PNG files. Accepts 0 – 7; 3 is default.
                progressive: true,    // For JPG files.
                multipass: false,     // For SVG files. Set to true for compression.
                interlaced: false     // For GIF files. Set to true for compression.
            })
        ))
        .pipe(gulp.dest(prodTargetFolder + '/' + imagesFolder));
});

gulp.task('copyUnprocessedAssetsToProdFolder', function () {
    return gulp.src([
        devSourceFolder + '/*.*',                               // Source all files,
        devSourceFolder + '/**',                                // and all folders,
                                                                // but
        '!' + devSourceFolder + '/' + imagesFolder,             // ignore images;
        '!' + devSourceFolder + '/**/*.js',                     // ignore JS;
        '!' + devSourceFolder + '/' + sassCSSFolder + '/**'     // ignore Sass/CSS.
    ], {dot: true}).pipe(gulp.dest(prodTargetFolder));
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
                baseDir: [
                    devTargetFolder,
                    devSourceFolder,
                    devSourceFolder + '/' + HTMLSourceFolder
                ]
            }
        });

        gulp.watch(devSourceFolder + '/' + JSFolder + '/*.js',
            ['compileJavaScriptForDev', 'lintJS']).on(
            'change',
            reload
        );

        gulp.watch(devSourceFolder + '/' + imagesFolder + '/**/*').on(
            'change',
            reload
        );

        gulp.watch([devSourceFolder + '/' + HTMLSourceFolder + '/**/*.html'],
            ['validateHTML']).on(
            'change',
            reload
        );

        gulp.watch(devSourceFolder + '/' + sassCSSFolder + '/**/*.scss',
            ['compileCSSForDev']).on(
            'change',
            reload
        );
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
