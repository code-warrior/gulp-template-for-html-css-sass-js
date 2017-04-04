/*jslint node: true */

var gulp = require('gulp');

gulp.task('copyUnprocessedAssetsToProdFolder', function () {
    'use strict';

    return gulp.src([
        'dev/*.*',       // Source all files,
        'dev/**',        // and all folders, but
        '!dev/html/',    // no the HTML folder,
        '!dev/html/*.*', // or any files in it,
        '!dev/html/**',  // or any subfolders;
        '!dev/img/',     // ignore images;
        '!dev/**/*.js',  // ignore JS;
        '!dev/styles/**' // ignore Sass/CSS.
    ], {dot: true}).pipe(gulp.dest('prod'));
});
