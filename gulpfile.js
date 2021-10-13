const { src, dest, series, watch } = require(`gulp`);
const del = require(`del`);
const htmlCompressor = require(`gulp-htmlmin`);
const htmlValidator = require(`gulp-html`);
const imageCompressor = require(`gulp-image`);
const jsLinter = require(`gulp-eslint`);
const browserSync = require(`browser-sync`);
const reload = browserSync.reload;
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
    return src([
        `dev/html/*.html`,
        `dev/html/**/*.html`])
        .pipe(htmlValidator(undefined));
};

let compressHTML = () => {
    return src([`dev/html/*.html`,`dev/html/**/*.html`])
        .pipe(htmlCompressor({collapseWhitespace: true}))
        .pipe(dest(`prod`));
};

let lintJS = () => {
    return src(`dev/scripts/*.js`)
        .pipe(jsLinter())
        .pipe(jsLinter.formatEach(`compact`));
};

let compressImages = () => {
    return src(`dev/img/**/*`)
        .pipe(imageCompressor({
            optipng: ['-i 1', '-strip all', '-fix', '-o7', '-force'],
            pngquant: ['--speed=1', '--force', 256],
            zopflipng: ['-y', '--lossy_8bit', '--lossy_transparent'],
            jpegRecompress: ['--strip', '--quality', 'medium', '--min', 40, '--max', 80],
            mozjpeg: ['-optimize', '-progressive'],
            gifsicle: ['--optimize'],
            svgo: ['--enable', 'cleanupIDs', '--disable', 'convertColors'],
            quiet: false
        }))
        .pipe(dest(`prod/img`));
};

let copyUnprocessedAssetsForProd = () => {
    return src([
        `dev/*.*`,       // Source all files,
        `dev/**`,        // and all folders,
        `!dev/html/`,    // but not the HTML folder
        `!dev/html/*.*`, // or any files in it
        `!dev/html/**`,  // or any sub folders;
        `!dev/img/`,     // ignore images;
        `!dev/**/*.js`,  // ignore JS;
        `!dev/styles/**` // and, ignore Sass/CSS.
    ], {dot: true})
        .pipe(dest(`prod`));
};

async function clean() {
    let fs = require(`fs`),
        i,
        foldersToDelete = [`./temp`, `prod`];

    for (i = 0; i < foldersToDelete.length; i++) {
        try {
            fs.accessSync(foldersToDelete[i], fs.F_OK);
            process.stdout.write(`\n\tThe ` + foldersToDelete[i] +
                ` directory was found and will be deleted.\n`);
            del(foldersToDelete[i]);
        } catch (e) {
            process.stdout.write(`\n\tThe ` + foldersToDelete[i] +
                ` directory does NOT exist or is NOT accessible.\n`);
        }
    }

    process.stdout.write(`\n`);
}

async function listTasks () {
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

        process.stdout.write(`\n\tThis default task does ` +
            `nothing but generate this message. The ` +
            `available tasks are:\n\n${stdout}`);
    });
}

let serve = () => {
    browserSync({
        notify: true,
        port: 9000,
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

    watch(`dev/html/**/*.html`, series(validateHTML))
        .on(`change`, reload);

    watch(`dev/img/**/*`)
        .on(`change`, reload);
};

exports.copyUnprocessedAssetsForProd = copyUnprocessedAssetsForProd;
exports.validateHTML = validateHTML;
exports.compressHTML = compressHTML;
exports.lintJS = lintJS;
exports.compressImages = compressImages;
exports.clean = clean;
exports.default = listTasks;
exports.serve = serve;
exports.brave = series(brave, serve);
exports.chrome = series(chrome, serve);
exports.edge = series(edge, serve);
exports.firefox = series(firefox, serve);
exports.opera = series(opera, serve);
exports.safari = series(safari, serve);
exports.vivaldi = series(vivaldi, serve);
exports.allBrowsers = series(allBrowsers, serve);
