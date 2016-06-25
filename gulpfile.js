/*jslint node: true */

'use strict';

var gulp             = require('gulp'),
    devSourceFolder  = 'dev/',
    prodTargetFolder = 'prod',
    imagesFolder     = 'img',
    sassCSSFolder    = 'styles/';

gulp.task('copyUnprocessedAssetsToProdFolder', function () {
    return gulp.src([
        devSourceFolder + '*.*',                           // Source all files,
        devSourceFolder + '**',                            // and all folders, but
        '!' + devSourceFolder + imagesFolder,         // ignore images;
        '!' + devSourceFolder + '**/*.js',                 // ignore JS;
        '!' + devSourceFolder + sassCSSFolder + '**' // ignore Sass/CSS.
    ], {dot: true}).pipe(gulp.dest(prodTargetFolder));
});
