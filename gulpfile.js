/*jslint node: true */

'use strict';

var gulp = require('gulp');

gulp.task('default', function () {
    process.stdout.write('\n\tThis default gulp task does nothing except generate ' +
        'this message.\n\tRun “gulp --tasks” to see the available tasks.\n\n');
});
