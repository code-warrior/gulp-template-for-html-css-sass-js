const { src, dest } = require(`gulp`);
const del = require(`del`);
const htmlCompressor = require(`gulp-htmlmin`);
const htmlValidator = require(`gulp-html`);
const imageCompressor = require(`gulp-image`);
const jsLinter = require(`gulp-eslint`);

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
        .pipe(jsLinter.formatEach(`compact`, process.stderr));
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

exports.validateHTML = validateHTML;
exports.compressHTML = compressHTML;
exports.lintJS = lintJS;
exports.compressImages = compressImages;
exports.clean = clean;
exports.default = listTasks;
