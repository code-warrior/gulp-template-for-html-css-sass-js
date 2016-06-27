/*jslint node: true */

var gulp = require('gulp'),
    del = require('del'),
    sass = require('gulp-sass'),
    CSSCompressor = require('gulp-csso'),
    browserSpecificPrefixGenerator = require('gulp-autoprefixer'),
    HTMLMinifier = require('gulp-htmlmin'),
    HTMLValidator = require('gulp-html'),
    JSConcatenator = require('gulp-concat'),
    JSLinter = require('gulp-eslint'),
    JSCompressor = require('gulp-uglify'),
    imageCompressor = require('gulp-imagemin'),
    tempCache = require('gulp-cache'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    browserChoice = 'default',

    baseFolders = {
        dev: 'dev/',
        tmp: 'temp/',
        prod: 'prod/'
    },
    scaffoldFolders = {
        html: 'html/',
        js: 'scripts/',
        styles: 'styles/',
        images: 'img/'
    },
    filenames = {
        js: {
            main: 'app.js',
            all: '*.js',
            grid: 'grid.js'
        },
        html: {
            all: '*.html',
            allNested: '**/*.html'
        },
        sass: 'main.scss'
    },

    colors = {
        black: '\033[0m',
        red: '\033[31m',
        boldred: '\033[31m\033[1m',
        green: '\033[32m',
        blue: '\033[34m'
    };

/**
 * CHOOSE A BROWSER OTHER THAN THE DEFAULT
 *
 * The following four tasks set the browser preference variable (browserChoice) in
 * the browserSync preferences read by the serve task. To use either of the four
 * browsers when serving this project, invoke Gulp as follows:
 *
 *    gulp safari serve
 *    gulp firefox serve
 *    gulp chrome serve
 *    gulp opera serve
 *
 * Testing in Windows and Linux is pending.
 */

gulp.task('safari', function () {
    'use strict';

    browserChoice = 'safari';
});

gulp.task('firefox', function () {
    'use strict';

    browserChoice = 'firefox';
});

gulp.task('chrome', function () {
    'use strict';

    browserChoice = 'google chrome';
});

gulp.task('opera', function () {
    'use strict';

    browserChoice = 'opera';
});

/**
 * VALIDATE HTML
 *
 * This task validates all HTML files supplied in the array. If no errors are found,
 * the Gulp task will simply move down a line, reporting the task is done.
 *
 * On error, however, you’ll receive one or more messages about your HTML errors.
 * These errors are reported as having been found at line and column values. For
 * example, 1.5 means an error on line 1, column 5.
 *
 * Regardless of whether your HTML validates or not, no files are copied to any
 * destination folder.
 */
gulp.task('validateHTML', function () {
    'use strict';

    return gulp.src([
        baseFolders.dev + scaffoldFolders.html + filenames.html.all,
        baseFolders.dev + scaffoldFolders.html + filenames.html.allNested
    ])
        .pipe(new HTMLValidator());
});

/**
 * COMPRESS HTML
 *
 * This task compresses all the HTML files in the supplied array, then writes the
 * compressed files to the baseFolders.prod folder.
 */
gulp.task('compressHTML', function () {
    'use strict';

    return gulp.src([
        baseFolders.dev + scaffoldFolders.html + filenames.html.all,
        baseFolders.dev + scaffoldFolders.html + filenames.html.allNested
    ])
        .pipe(new HTMLMinifier({
            removeComments: true,
            collapseWhitespace: true
        }))
        .pipe(gulp.dest(baseFolders.prod));
});

/**
 * COMPILE CSS FOR DEVELOPMENT WORK
 *
 * This task looks for a single Sass file, compiles the CSS
 * from it, and writes the resulting file to the baseFolders.tmp +
 * scaffoldFolders.styles. The final CSS file will be formatted with 2-space
 * indentations. Any floating-point calculations will be carried out 10 places, and
 * browser-specific prefixes will be added to support 2 browser versions behind all
 * current browsers’ versions.
 */
gulp.task('compileCSSForDev', function () {
    'use strict';

    return gulp.src(baseFolders.dev +
            scaffoldFolders.styles +
            '00-main-dev/' +
            filenames.sass)
        .pipe(sass({
            outputStyle: 'expanded',
            precision: 10
        }).on('error', sass.logError))
        .pipe(browserSpecificPrefixGenerator({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest(baseFolders.tmp + scaffoldFolders.styles));
});

/**
 * COMPILE CSS FOR PRODUCTION
 *
 * This task looks for a single Sass file, compiles the CSS
 * from it, and writes the resulting single CSS file to the baseFolders.prod +
 * scaffoldFolders.styles. Any floating-point calculations will be carried out 10
 * places, and browser-specific prefixes will be added to support 2 browser versions
 * behind all current browsers’ versions. Lastly, the final CSS file is passed
 * through two levels of compression: “outputStyle” from Sass and compressCSS().
 */
gulp.task('compileCSSForProd', function () {
    'use strict';

    return gulp.src(baseFolders.dev +
            scaffoldFolders.styles +
            '00-main-prod/' +
            filenames.sass)
        .pipe(sass({
            outputStyle: 'compressed',
            precision: 10
        }).on('error', sass.logError))
        .pipe(browserSpecificPrefixGenerator({
            browsers: ['last 2 versions']
        }))
        .pipe(new CSSCompressor())
        .pipe(gulp.dest(baseFolders.prod + scaffoldFolders.styles));
});

/**
 * COMPILE ALL JAVASCRIPT FILES INTO ONE FILE FOR DEVELOPMENT WORK
 *
 * This task compiles preCompiledJavaScriptFilesWithGrid via the
 * compileJavaScript concatenator, then writes the result to the
 * javaScriptDevTargetFolder with filename javaScriptTargetFilename.
 */
gulp.task('compileJSForDev', function () {
    'use strict';

    return gulp.src(baseFolders.dev + scaffoldFolders.js + filenames.js.all)
        .pipe(new JSConcatenator(filenames.js.main))
        .pipe(gulp.dest(baseFolders.tmp + scaffoldFolders.js));
});

/**
 * COMPILE ALL JAVASCRIPT FILES INTO A SINGLE FILE FOR PRODUCTION
 *
 * This task compiles one or more JavaScript files into a single file whose name is
 * the value to the filenames.js.main variable. The resulting file is compressed then
 * written to the baseFolders.prod + scaffoldFolders.js.
 *
 * Note: This task does not contain the grid used during development.
 */
gulp.task('compileJSForProd', function () {
    'use strict';

    return gulp.src([
        baseFolders.dev + scaffoldFolders.js + filenames.js.all,
        '!' + baseFolders.dev + scaffoldFolders.js + filenames.js.grid
    ])
        .pipe(new JSConcatenator(filenames.js.main))
        .pipe(new JSCompressor())
        .pipe(gulp.dest(baseFolders.prod + scaffoldFolders.js));
});

/**
 * LINT JAVASCRIPT
 *
 * This task lints JavaScript using the linter defined by JSLinter, the second pipe
 * in this task. (ESLint is the linter in this case.) In order to generate a linting
 * report, the multiple JS files in the supplied array are compiled
 * into a single, memory-cached file with a temporary name, then sent to the linter
 * for processing.
 *
 * Note: The temporary file is *not* written to a destination folder.
 */
gulp.task('lintJS', function () {
    'use strict';

    return gulp.src([
        baseFolders.dev + scaffoldFolders.js + filenames.js.all,
        '!' + baseFolders.dev + scaffoldFolders.js + filenames.js.grid
    ])
        .pipe(new JSConcatenator(filenames.js.main))
        .pipe(new JSLinter({
            rules: {
                indent: [
                    2,
                    4,
                    {SwitchCase: 1}
                ],
                quotes: [
                    2,
                    'single'
                ],
                'linebreak-style': [
                    2,
                    'unix'
                ],
                semi: [
                    2,
                    'always'
                ],
                'max-len': [
                    2,
                    85,
                    4
                ]
            },
            env: {
                node: true,
                browser: true
            },
            extends: 'eslint:recommended'
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

/**
 * COMPRESS THEN COPY IMAGES TO THE PRODUCTION FOLDER
 *
 * This task sources all the images in the baseFolders.dev, compresses PNGs and JPGs,
 * then copies the final compressed images to the baseFolders.prod.
 */
gulp.task('compressThenCopyImagesToProdFolder', function () {
    'use strict';

    return gulp.src(baseFolders.dev + scaffoldFolders.images + '**/*')
        .pipe(tempCache(
            imageCompressor({
                optimizationLevel: 3, // For PNG files. Accepts 0 – 7; 3 is default.
                progressive: true,    // For JPG files.
                multipass: false,     // For SVG files. Set to true for compression.
                interlaced: false     // For GIF files. Set to true for compression.
            })
        ))
        .pipe(gulp.dest(baseFolders.prod + scaffoldFolders.images));
});

/**
 * COPY UNPROCESSED ASSETS TO THE PRODUCTION FOLDER
 *
 * This task copies all unprocessed assets in the baseFolders.dev to the
 * baseFolders.prod that aren’t images, JavaScript, or Sass/CSS. This is because
 * those files are processed by other tasks, then copied after processing:
 *
 * — Images are compressed then copied by the compressThenCopyImagesToProdFolder task
 * — JavaScript is concatenated and compressed by the compileJSForProd task
 * — Sass/CSS is concatenated and compressed by the compileCSSForProd task
 */
gulp.task('copyUnprocessedAssetsToProdFolder', function () {
    'use strict';

    return gulp.src([
        baseFolders.dev + '*.*',                              // Source all files,
        baseFolders.dev + '**',                               // and all folders,
                                                              // but not
        '!' + baseFolders.dev + scaffoldFolders.html,         // the HTML folder
        '!' + baseFolders.dev + scaffoldFolders.html + '*.*', // or any files in it
        '!' + baseFolders.dev + scaffoldFolders.html + '**',  // or any sub folders
        '!' + baseFolders.dev + scaffoldFolders.images,       // ignore images;
        '!' + baseFolders.dev + '**/*.js',                    // ignore JS;
        '!' + baseFolders.dev + scaffoldFolders.styles + '**' // ignore Sass/CSS.
    ], {dot: true}).pipe(gulp.dest(baseFolders.prod));
});

/**
 * BUILD
 *
 * This task validates HTML, lints JavaScript, compiles any files that require
 * pre-processing, then copies the pre-processed and unprocessed files to the
 * baseFolders.prod.
 */
gulp.task('build', [
    'validateHTML',
    'compressHTML',
    'compileCSSForProd',
    'lintJS',
    'compileJSForProd',
    'compressThenCopyImagesToProdFolder',
    'copyUnprocessedAssetsToProdFolder'
]);

/**
 * SERVE
 *
 * Used for development only, this task compiles CSS via Sass, concatenates one or
 * more JavaScript files into a single file, lints JavaScript, then, finally,
 * validates HTML.
 *
 * The localhost server looks for index.html as the first page to load from either
 * the temporary folder (baseFolders.tmp), the development folder (baseFolders.dev),
 * or the folder containing HTML (baseFolders.dev + '/' + scaffoldFolders.html).
 *
 * Files that require pre-processing must be written to a folder before being served.
 * Thus, this task serves CSS and JS from a temp folder, the development target
 * folder (baseFolders.tmp), while un-processed files, such as fonts and images, are
 * served from the development source folder (baseFolders.dev).
 *
 * If a JS file is changed, all JS files are rebuilt, the resulting file is linted,
 * and the browser reloads.
 *
 * If a Sass file is changed, a re-compilation of the primary CSS file is generated,
 * and the browser reloads.
 *
 * Finally, changes to images also trigger a browser reload.
 */
gulp.task('serve', [
    'compileCSSForDev',
    'compileJSForDev',
    'lintJS',
    'validateHTML'
],
        function () {
    'use strict';

    browserSync({
        notify: true,
        port: 9000,
        reloadDelay: 100,
        browser: browserChoice,
        server: {
            baseDir: [
                baseFolders.tmp,
                baseFolders.dev,
                baseFolders.dev + scaffoldFolders.html
            ]
        }
    });

    gulp.watch(baseFolders.dev + scaffoldFolders.js + '*.js',
            ['compileJSForDev', 'lintJS']).on(
        'change',
        reload
    );

    gulp.watch(baseFolders.dev + scaffoldFolders.images + '**/*').on(
        'change',
        reload
    );

    gulp.watch([baseFolders.dev + scaffoldFolders.html + '**/*.html'],
            ['validateHTML']).on(
        'change',
        reload
    );

    gulp.watch(baseFolders.dev + scaffoldFolders.styles + '**/*.scss',
            ['compileCSSForDev']).on(
        'change',
        reload
    );
});

/**
 * CLEAN
 *
 * This tasks deletes the baseFolders.tmp and baseFolders.prod directories, both of
 * which are expendable, since Gulp can re-build them at any moment.
 */
gulp.task('clean', function () {
    'use strict';

    var fs = require('fs'),
        i,
        expendableFolders = [baseFolders.tmp, baseFolders.prod];

    for (i = 0; i < expendableFolders.length; i += 1) {
        try {
            fs.accessSync(expendableFolders[i], fs.F_OK);
            process.stdout.write('\n\tThe ' + colors.green + expendableFolders[i] +
                    colors.black + ' directory was found and ' + colors.green +
                    'will' + colors.black + ' be deleted.\n');
            del(expendableFolders[i]);
        } catch (error) {
            if (error) {
                process.stdout.write('\n\tThe ' + colors.red +
                        expendableFolders[i] + colors.black +
                        ' directory does ' + colors.red + 'not' + colors.black +
                        ' exist or is ' + colors.red + 'not' + colors.black +
                        ' accessible.\n');
            }
        }
    }

    process.stdout.write('\n');
});

/**
 * DEFAULT
 *
 * This task does nothing. See the output message below.
 */
gulp.task('default', function () {
    'use strict';

    process.stdout.write('\n\tThis default gulp task does nothing except generate ' +
            'this message.\n\tRun “gulp --tasks” to see the available tasks.\n\n');
});
