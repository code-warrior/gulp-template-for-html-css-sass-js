    browserChoice = `safari`;

    browserChoice = `firefox`;

    browserChoice = `google chrome`;

    browserChoice = `opera`;

    browserChoice = `microsoft-edge`;
        .pipe(htmlValidator());


        .pipe(sass({
            outputStyle: `expanded`,
            precision: 10
        }).on(`error`, sass.logError))

        .pipe(sass({
            outputStyle: `compressed`,
            precision: 10
        }).on(`error`, sass.logError))

        .pipe(babel())

        .pipe(babel())
        .pipe(jsCompressor())

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

        `dev/*.*`,       // Source all files,
        `dev/**`,        // and all folders,
        `!dev/html/`,    // but not the HTML folder
        `!dev/html/*.*`, // or any files in it
        `!dev/html/**`,  // or any sub folders;
        `!dev/img/`,     // ignore images;
        `!dev/**/*.js`,  // ignore JS;
        `!dev/styles/**` // and, ignore Sass/CSS.
    browserSync({
        notify: true,
        port: 9000,
        browser: browserChoice,
        server: {
            baseDir: [
                `temp`,
                `dev`,
                `dev/html`
            ]
        }
    });





    let fs = require(`fs`),
        i,

        try {
        }
    }

    process.stdout.write(`\n`);

    let exec = require(`child_process`).exec;

    exec(`gulp --tasks`, function (error, stdout, stderr) {
        if (null !== error) {
            process.stdout.write(`An error was likely generated when invoking ` +
        }

        if (`` !== stderr) {
            process.stdout.write(`Content has been written to the stderr stream ` +
        }

    });
