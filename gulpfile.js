/*jslint node: true */

'use strict';

var gulp             = require('gulp'),
    devSourceFolder  = 'dev/',
    prodTargetFolder = 'prod/',
    htmlFolder       = 'html/',
    imagesFolder     = 'img/',
    sassCSSFolder    = 'styles/';

gulp.task('copyUnprocessedAssetsToProdFolder', function () {
    return gulp.src([
        devSourceFolder + '*.*',                           // Source all files,
        devSourceFolder + '**',                            // and all folders, but
        '!' + devSourceFolder + htmlFolder,                // no the HTML folder,
        '!' + devSourceFolder + htmlFolder + '*.*',        // or any files in it,
        '!' + devSourceFolder + htmlFolder + '**',         // or any subfolders;
        '!' + devSourceFolder + imagesFolder,         // ignore images;
        '!' + devSourceFolder + '**/*.js',                 // ignore JS;
        '!' + devSourceFolder + sassCSSFolder + '**' // ignore Sass/CSS.
    ], {dot: true}).pipe(gulp.dest(prodTargetFolder));
});
