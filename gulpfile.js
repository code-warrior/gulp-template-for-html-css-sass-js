/*jslint node: true */

'use strict';

var gulp             = require('gulp'),
    tempCache        = require('gulp-cache'),
    compressImages   = require('gulp-imagemin'),

    // Folder name variables
    devSourceFolder  = 'dev',
    prodTargetFolder = 'prod',
    imagesFolder     = 'img';

gulp.task('compressThenCopyImagesToProdFolder', function () {
    return gulp.src(devSourceFolder + '/' + imagesFolder + '/**/*')
        .pipe(tempCache(
            compressImages({
                optimizationLevel: 3, // For PNG files. Accepts 0 – 7; 3 is default.
                progressive: true,    // For JPG files.
                multipass: false,     // For SVG files. Set to true for compression.
                interlaced: false     // For GIF files. Set to true for compression.
            })
        ))
        .pipe(gulp.dest(prodTargetFolder + '/' + imagesFolder));
});
