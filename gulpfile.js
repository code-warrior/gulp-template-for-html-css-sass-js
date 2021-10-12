/*jslint node: true */

const { src, dest } = require(`gulp`);
const sass = require(`gulp-sass`)(require('sass'));
const browserSpecificPrefixer = require(`gulp-autoprefixer`);

let compileCSSForDev = () => {
    return src(`dev/styles/main.scss`)
        .pipe(sass({
            outputStyle: `expanded`,
            precision: 10
        }).on(`error`, sass.logError))
        .pipe(browserSpecificPrefixer({
            browsers: [`last 2 versions`]
        }))
        .pipe(dest(`temp/styles`));
};

exports.compileCSSForDev = compileCSSForDev;
