/*jslint node: true */

var gulp = require('gulp');

gulp.task('clean', function () {
    'use strict';

    var del = require('del'),
        expendableFolders = ['temp', 'prod'],
        fs = require('fs'),
        i;

    for (i = 0; i < expendableFolders.length; i += 1) {
        try {
            fs.accessSync(expendableFolders[i], fs.F_OK);
            process.stdout.write('\n\tThe ' + expendableFolders[i] +
                    ' directory was found and will be deleted.\n');
            del(expendableFolders[i]);
        } catch (e) {
            process.stdout.write('\n\t' + e.toString() + '\n');
        }
    }

    process.stdout.write('\n');
});
