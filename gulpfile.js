/*jslint node: true */

var gulp = require('gulp');

gulp.task('default', function () {
    'use strict';

    process.stdout.write('\n\tThis default gulp task does nothing except generate ' +
        'this message.\n\tRun “gulp --tasks” to see the available tasks.\n\n');
});
