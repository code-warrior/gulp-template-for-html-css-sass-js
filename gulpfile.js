const { src, dest, series, watch } = require(`gulp`),
    CSSLinter = require(`gulp-stylelint`),
    { deleteAsync } = require(`del`),
    babel = require(`gulp-babel`),
    htmlCompressor = require(`gulp-htmlmin`),
    htmlValidator = require(`gulp-html`),
    jsCompressor = require(`gulp-uglify`),
    jsLinter = require(`gulp-eslint`),
    sass = require(`gulp-sass`)(require(`sass`)),
    browserSync = require(`browser-sync`),
    reload = browserSync.reload;

let browserChoice = `default`;

async function brave () {
    browserChoice = `brave browser`;
}

async function chrome () {
    browserChoice = `google chrome`;
}

async function edge () {
    // In Windows, the value might need to be “microsoft-edge”. Note the dash.
    browserChoice = `microsoft edge`;
}

async function firefox () {
    browserChoice = `firefox`;
}

async function opera () {
    browserChoice = `opera`;
}

async function safari () {
    browserChoice = `safari`;
}

async function vivaldi () {
    browserChoice = `vivaldi`;
}

async function allBrowsers () {
    browserChoice = [
        `brave browser`,
        `google chrome`,
        `microsoft edge`, // Note: In Windows, this might need to be microsoft-edge
        `firefox`,
        `opera`,
        `safari`,
        `vivaldi`
    ];
}

let validateHTML = () => {
    return src([`dev/html/*.html`, `dev/html/**/*.html`])
        .pipe(htmlValidator(undefined));
};

let compileCSSForDev = () => {
    return src(`dev/styles/scss/main.scss`)
        .pipe(sass.sync({
            style: `expanded`,
            precision: 10
        }).on(`error`, sass.logError))
        .pipe(dest(`temp/styles`));
};

let lintJS = () => {
    return src(`dev/scripts/*.js`)
        .pipe(jsLinter())
        .pipe(jsLinter.formatEach(`compact`));
};

let transpileJSForDev = () => {
    return src(`dev/scripts/*.js`)
        .pipe(babel())
        .pipe(dest(`temp/scripts`));
};

let compressHTML = () => {
    return src([`dev/html/*.html`, `dev/html/**/*.html`])
        .pipe(htmlCompressor({collapseWhitespace: true}))
        .pipe(dest(`prod`));
};

let compileCSSForProd = () => {
    return src(`dev/styles/scss/main.scss`)
        .pipe(sass.sync({
            style: `compressed`,
            precision: 10
        }).on(`error`, sass.logError))
        .pipe(dest(`prod/styles`));
};

let transpileJSForProd = () => {
    return src(`dev/scripts/*.js`)
        .pipe(babel())
        .pipe(jsCompressor())
        .pipe(dest(`prod/scripts`));
};

let copyUnprocessedAssetsForProd = () => {
    return src([
        `dev/*.*`,             // Source all files,
        `dev/**`,              // and all folders,
        `!dev/html/`,          // but not the HTML folder
        `!dev/html/*.*`,       // or any files in it
        `!dev/html/**`,        // or any sub folders;
        `!dev/img/`,           // ignore images;
        `!dev/img/.gitignore`, // ignore .gitignore;
        `!dev/**/*.js`,        // ignore JS;
        `!dev/styles/**`       // and, ignore Sass/CSS.
    ], {dot: true})
        .pipe(dest(`prod`));
};

let serve = () => {
    browserSync({
        notify: true,
        reloadDelay: 50,
        browser: browserChoice,
        server: {
            baseDir: [
                `temp`,
                `dev`,
                `dev/html`
            ]
        }
    });

    watch(`dev/scripts/*.js`, series(lintJS, transpileJSForDev))
        .on(`change`, reload);

    watch(`dev/styles/scss/**/*.scss`, compileCSSForDev)
        .on(`change`, reload);

    watch(`dev/html/**/*.html`, validateHTML)
        .on(`change`, reload);

    watch(`dev/img/**/*`)
        .on(`change`, reload);
};

async function clean() {
    const foldersToDelete = await deleteAsync([`./temp`, `prod`]);

    console.log(`The following directories were deleted:`, foldersToDelete);
}

async function listTasks () {
    let exec = require(`child_process`).exec;

    exec(`gulp --tasks`, function (error, stdout) {
        if (null !== error) {
            console.log(`An error was generated when invoking the “exec”` +
                `program in the default task.`);
        }

        console.log(`\n\tThis default task does nothing but generate this ` +
            `message. The available tasks are:\n\n${stdout}`);
    });
}

let lintCSS = () => {
    return src(`dev/styles/css/**/*.css`)
        .pipe(CSSLinter({
            failAfterError: false,
            reporters: [
                {formatter: `string`, console: true}
            ]
        }));
};

exports.brave = series(brave, serve);
exports.chrome = series(chrome, serve);
exports.edge = series(edge, serve);
exports.firefox = series(firefox, serve);
exports.opera = series(opera, serve);
exports.safari = series(safari, serve);
exports.vivaldi = series(vivaldi, serve);
exports.allBrowsers = series(allBrowsers, serve);
exports.validateHTML = validateHTML;
exports.compileCSSForDev = compileCSSForDev;
exports.lintJS = lintJS;
exports.transpileJSForDev = transpileJSForDev;
exports.compressHTML = compressHTML;
exports.compileCSSForProd = compileCSSForProd;
exports.transpileJSForProd = transpileJSForProd;
exports.copyUnprocessedAssetsForProd = copyUnprocessedAssetsForProd;
exports.clean = clean;
exports.default = listTasks;
exports.lintCSS = lintCSS;
exports.serve = series(
    validateHTML,
    compileCSSForDev,
    lintJS,
    transpileJSForDev,
    serve
);
exports.build = series(
    compressHTML,
    compileCSSForProd,
    transpileJSForProd,
    copyUnprocessedAssetsForProd
);
