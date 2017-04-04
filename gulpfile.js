/*jslint node: true */

var gulp = require('gulp');

gulp.task('compressThenCopyImagesToProdFolder', function () {
    'use strict';

    var tempCache = require('gulp-cache'),
        imageCompressor = require('gulp-imagemin');

    return gulp.src('dev/img/**/*')
        .pipe(tempCache(
            imageCompressor({
                optimizationLevel: 3, // For PNG files. Accepts 0 – 7; 3 is default.
                progressive: true,    // For JPG files.
                multipass: false,     // For SVG files. Set to true for compression.
                interlaced: false     // For GIF files. Set to true for compression.
            })
        ))
        .pipe(gulp.dest('prod/img'));
});
