/*jslint node: true */

const { src, dest }= require('gulp');
const htmlCompressor = require('gulp-htmlmin');
    
gulp.task('compressHTML', function () {
    'use strict';

    return gulp.src(['dev/html/*.html', 'dev/html/**/*.html'])
        .pipe(htmlMinifier({
            removeComments: true,
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('prod'));
});
