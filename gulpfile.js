/*jslint node: true, for */

'use strict';

let gulp = require(`gulp`),
    del = require(`del`),
    sass = require(`gulp-sass`),
    babel = require(`gulp-babel`),
    cssCompressor = require(`gulp-csso`),
    browserSpecificPrefixer = require(`gulp-autoprefixer`),
    htmlMinifier = require(`gulp-htmlmin`),
    htmlValidator = require(`gulp-html`),
    jsLinter = require(`gulp-eslint`),
    jsCompressor = require(`gulp-uglify`),
    imageCompressor = require(`gulp-imagemin`),
    tempCache = require(`gulp-cache`),
    browserSync = require(`browser-sync`),
    config = require(`./config.json`),
    colors = config.colors,
    reload = browserSync.reload,
    browserChoice = `default`;

/**
 * CHOOSE A BROWSER OTHER THAN THE DEFAULT
 *
 * Each of the following tasks sets the browser preference variable “browserChoice”
 * used by the “serve” task. To preview your project in either or all of your
 * browsers, invoke Gulp as follows:
 *
 *    gulp safari serve
 *    gulp firefox serve
 *    gulp chrome serve
 *    gulp opera serve
 *    gulp edge serve
 *    gulp allBrowsers serve
 */

gulp.task(`safari`, function () {
    browserChoice = `safari`;
});

gulp.task(`firefox`, function () {
    browserChoice = `firefox`;
});

gulp.task(`chrome`, function () {
    browserChoice = `google chrome`;
});

gulp.task(`opera`, function () {
    browserChoice = `opera`;
});

gulp.task(`edge`, function () {
    browserChoice = `microsoft-edge`;
});

gulp.task(`allBrowsers`, function () {
    browserChoice = [`safari`, `firefox`, `google chrome`, `opera`, `microsoft-edge`];
});

/**
 * VALIDATE HTML
 *
 * This task sources all the HTML files in the dev/html folder, then validates them.
 *
 * On error, the validator will generate one or more messages to the console with
 * line and column co-ordinates, indicating where in your file the error was
 * generated.
 *
 * Note: Regardless of whether your HTML validates or not, no files are copied to a
 * destination folder.
 */
gulp.task(`validateHTML`, function () {
    return gulp.src([`dev/html/*.html`, `dev/html/**/*.html`])
        .pipe(htmlValidator());
});

/**
 * COMPRESS HTML
 *
 * This task sources all the HTML files in the dev/html folder, strips comments and
 * whitespace from them, then writes the compressed file(s) to the production folder.
 */
gulp.task(`compressHTML`, function () {
    return gulp.src([`dev/html/*.html`, `dev/html/**/*.html`])
        .pipe(htmlMinifier({
            removeComments: true,
            collapseWhitespace: true
        }))
        .pipe(gulp.dest(`prod`));
});

/**
 * COMPILE CSS FOR DEVELOPMENT WORK
 *
 * This task looks for a single Sass file, compiles the CSS from it, and writes the
 * resulting CSS file to the temporary folder temp/styles. The file will be
 * formatted with 2-space indentations. Any floating-point calculations will be
 * carried out 10 places and browser-specific prefixes will be added to support 2
 * browser versions behind all current browsers’ versions.
 */
gulp.task(`compileCSSForDev`, function () {
    return gulp.src(`dev/styles/main.scss`)
        .pipe(sass({
            outputStyle: `expanded`,
            precision: 10
        }).on(`error`, sass.logError))
        .pipe(browserSpecificPrefixer({
            browsers: [`last 2 versions`]
        }))
        .pipe(gulp.dest(`temp/styles`));
});

/**
 * COMPILE CSS FOR PRODUCTION
 *
 * This task looks for a single Sass file, compiles the CSS from it, and writes the
 * resulting single CSS file to the production folder. Any floating-point
 * calculations will be carried out 10 places, and browser-specific prefixes will be
 * added to support 2 browser versions behind all current browsers’ versions.
 * Lastly, the final CSS file is passed through two levels of compression: One via
 * Sass as an option (“outputStyle”) and the other from the cssCompressor() module.
 */
gulp.task(`compileCSSForProd`, function () {
    return gulp.src(`dev/styles/main.scss`)
        .pipe(sass({
            outputStyle: `compressed`,
            precision: 10
        }).on(`error`, sass.logError))
        .pipe(browserSpecificPrefixer({
            browsers: [`last 2 versions`]
        }))
        .pipe(cssCompressor())
        .pipe(gulp.dest(`prod/styles`));
});

/**
 * TRANSPILE JAVASCRIPT FILES FOR DEVELOPMENT
 *
 * This task sources all the JavaScript files in dev/scripts, transpiles them to ES6,
 * then writes the result to the temp/scripts folder.
 */
gulp.task(`transpileJSForDev`, function () {
    return gulp.src(`dev/scripts/*.js`)
        .pipe(babel())
        .pipe(gulp.dest(`temp/scripts`));
});

/**
 * TRANSPILE JAVASCRIPT FILES FOR PRODUCTION
 *
 * This task sources all the JavaScript files in dev/scripts, transpiles them to ES6,
 * compresses the output, then writes the result to the prod/scripts folder.
 */
gulp.task(`transpileJSForProd`, function () {
    return gulp.src(`dev/scripts/*.js`)
        .pipe(babel())
        .pipe(jsCompressor())
        .pipe(gulp.dest(`prod/scripts`));
});

/**
 * LINT JAVASCRIPT
 *
 * This task sources all the JavaScript files in dev/scripts and lints them.
 * Errors/warnings are formatted using ESLint’s “compact” option for error reporting.
 *
 * https://eslint.org/docs/user-guide/formatters/#compact
 */
gulp.task(`lintJS`, function () {
    return gulp.src(`dev/scripts/*.js`)
        .pipe(jsLinter({
            rules: {
                indent: [2, 4, {SwitchCase: 1}],
                quotes: [2, `backtick`],
                semi: [2, `always`],
                'linebreak-style': [2, `unix`],
                'max-len': [1, 85, 4]
            },
            env: {
                es6: true,
                node: true,
                browser: true
            },
            extends: `eslint:recommended`
        }))
        .pipe(jsLinter.formatEach(`compact`, process.stderr));
});

/**
 * COMPRESS THEN COPY IMAGES TO THE PRODUCTION FOLDER
 *
 * This task sources all the images in the dev/img folder, compresses them based on
 * the settings in the object passed to imageCompressor, then copies the final
 * compressed images to the prod/img folder.
 */
gulp.task(`compressThenCopyImagesToProdFolder`, function () {
    return gulp.src(`dev/img/**/*`)
        .pipe(tempCache(
            imageCompressor({
                optimizationLevel: 3, // For PNG files. Accepts 0 – 7; 3 is default.
                progressive: true,    // For JPG files.
                multipass: false,     // For SVG files. Set to true for compression.
                interlaced: false     // For GIF files. Set to true for compression.
            })
        ))
        .pipe(gulp.dest(`prod/img`));
});

/**
 * COPY UNPROCESSED ASSETS TO THE PRODUCTION FOLDER
 *
 * This task copies all unprocessed assets that aren’t images, JavaScript,
 * Sass/CSS to the production folder, because those files are processed by other
 * tasks, specifically:
 *
 * — Images are handled by the compressThenCopyImagesToProdFolder task
 * — JavaScript is handled by the transpileJSForProd task
 * — Sass/CSS is handled by the compileCSSForProd task
 */
gulp.task(`copyUnprocessedAssetsToProdFolder`, function () {
    return gulp.src([
        `dev/*.*`,       // Source all files,
        `dev/**`,        // and all folders,
        `!dev/html/`,    // but not the HTML folder
        `!dev/html/*.*`, // or any files in it
        `!dev/html/**`,  // or any sub folders;
        `!dev/img/`,     // ignore images;
        `!dev/**/*.js`,  // ignore JS;
        `!dev/styles/**` // and, ignore Sass/CSS.
    ], {dot: true}).pipe(gulp.dest(`prod`));
});

/**
 * BUILD
 *
 * Meant for building a production version of your project, this task simply invokes
 * other pre-defined tasks.
 */
gulp.task(`build`, [
    `validateHTML`,
    `compressHTML`,
    `compileCSSForProd`,
    `lintJS`,
    `transpileJSForProd`,
    `compressThenCopyImagesToProdFolder`,
    `copyUnprocessedAssetsToProdFolder`
]);

/**
 * SERVE
 *
 * Used for development, this task…
 *
 *    — compiles CSS via Sass,
 *    — transpiles JavaScript files into ES6,
 *    — lints JavaScript, and
 *    — validates HTML.
 *
 * Your localhost server looks for index.html as the first page to load from either
 * the temporary folder (temp), the development folder (dev), or the folder
 * containing HTML (html).
 *
 * Files that require pre-processing must be written to a folder before being served.
 * Thus, CSS and JS are served from a temp folder (temp), while un-processed files,
 * such as fonts and images, are served from the development source folder (dev).
 *
 * If a JavaScript file is changed, all JavaScript files are linted, re-transpiled,
 * and the browser reloads.
 *
 * If a Sass file is changed, a re-compilation of the primary CSS file is generated,
 * and the browser reloads.
 *
 * Finally, changes to images also trigger a browser reload.
 */
gulp.task(`serve`, [`compileCSSForDev`, `lintJS`, `transpileJSForDev`, `validateHTML`], function () {
    browserSync({
        notify: true,
        port: 9000,
        reloadDelay: 100,
        browser: browserChoice,
        server: {
            baseDir: [
                `temp`,
                `dev`,
                `dev/html`
            ]
        }
    });

    gulp.watch(`dev/scripts/*.js`, [`lintJS`, `transpileJSForDev`])
        .on(`change`, reload);

    gulp.watch(`dev/styles/**/*.scss`, [`compileCSSForDev`])
        .on(`change`, reload);

    gulp.watch([`dev/html/**/*.html`], [`validateHTML`])
        .on(`change`, reload);

    gulp.watch(`dev/img/**/*`)
        .on(`change`, reload);
});

/**
 * CLEAN
 *
 * This task deletes the temp and prod folders, both of which are expendable, since
 * Gulp creates them as temporary folders during the serve and build tasks.
 */
gulp.task(`clean`, function () {
    let fs = require(`fs`),
        i,
        expendableFolders = [`temp`, `prod`];

    for (i = 0; i < expendableFolders.length; i += 1) {
        try {
            fs.accessSync(expendableFolders[i], fs.F_OK);
            process.stdout.write(`\n\tThe ${colors.green}${expendableFolders[i]}` +
                    `${colors.default} directory was found and ${colors.green}` +
                    `will ${colors.default}be deleted.\n`);
            del(expendableFolders[i]);
        } catch (error) {
            if (error) {
                process.stdout.write(`\n\tThe ${colors.red}` +
                        `${expendableFolders[i]} ${colors.default}` +
                        `directory does ${colors.red}not ${colors.default}` +
                        `exist or is ${colors.red}not ${colors.default}` +
                        `accessible.\n`);
            }
        }
    }

    process.stdout.write(`\n`);
});

/**
 * DEFAULT
 *
 * This task does nothing but list the available tasks in this file.
 */
gulp.task(`default`, function () {
    let exec = require(`child_process`).exec;

    exec(`gulp --tasks`, function (error, stdout, stderr) {
        if (null !== error) {
            process.stdout.write(`An error was likely generated when invoking ` +
                    `the “exec” program in the default task.`);
        }

        if (`` !== stderr) {
            process.stdout.write(`Content has been written to the stderr stream ` +
                    `when invoking the “exec” program in the default task.`);
        }

        process.stdout.write(`\n\tThis default task does ${colors.red}` +
                `nothing ${colors.default}but generate this message. The ` +
                `available tasks are:\n\n ${stdout}`);
    });
});
