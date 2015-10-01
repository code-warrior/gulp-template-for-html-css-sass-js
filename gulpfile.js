/*jslint
    node: true */

'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var uglify = require('gulp-uglify');

/**
 * STYLES
 *
 * @param styles is the name of this task that…
 * @param function is a callback function that…
 */
gulp.task('styles', function () {
    return gulp.src('app/styles/main.scss')
        .pipe($.sourcemaps.init())
        .pipe($.sass({
            outputStyle: 'compressed',
            precision: 10,
            includePaths: ['.'],
            onError: console.error.bind(console, '\n\nSass error:\n\n')
        }))
        .pipe($.postcss([
            require('gulp-autoprefixer')({browsers: ['last 1 version']})
        ]))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('.tmp/styles'))
        .pipe(reload({stream: true}));
});

/**
 * COMPRESS
 *
 * @param compress is the name of this task that…
 * @param function is a callback function that…
 */
gulp.task('compress', function () {
    return gulp.src('app/scripts/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'));
});

/**
 * HTML
 *
 * @param html is the name of this task that…
 * @param function is a callback function that…
 */
gulp.task('html', ['styles'], function () {
    var assets = $.useref.assets({searchPath: ['.tmp', 'app', '.']});

    return gulp.src('app/**/*.html')
        .pipe(assets)
        // .pipe($.if('*.js', $.uglify()))
        // .pipe($.if('*.css', $.csso()))
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe($.if('*.html', $.minifyHtml({conditionals: true, false: true})))
        .pipe(gulp.dest('dist'));
});

/**
 * IMAGES
 *
 * @param images is the name of this task that…
 * @param function is a callback function that…
 */
gulp.task('images', function () {
    return gulp.src('app/img/**/*')
        .pipe($.cache($.imagemin({
            progressive: true,
            interlaced: true,
            // don't remove IDs from SVGs, they are often used
            // as hooks for embedding and styling
            svgoPlugins: [{cleanupIDs: false}]
        })))
        .pipe(gulp.dest('dist/img'));
});

/**
 * EXTRAS
 *
 * @param extras is the name of this task that…
 * @param function is a callback function that…
 */
gulp.task('extras', function () {
    return gulp.src([
        'app/**/*.*',
        '!app/**/*.html'
    ], {
        dot: true
    }).pipe(gulp.dest('dist'));
});

/**
 * CLEAN
 *
 * @param clean is the name of this task that…
 * @param function is a callback function that…
 */
gulp.task('clean', require('del').bind(null, ['.tmp', 'dist']));

/**
 * SERVE
 *
 * @param serve is the name of this task that…
 * @param function is a callback function that…
 */
gulp.task('serve', ['styles'], function () {
    browserSync({
        notify: false,
        port: 9000,
        server: {
            baseDir: ['.tmp', 'app'],
            routes: {
                '/bower_components': 'bower_components'
            }
        }
    });

    gulp.watch([
        'app/**/*.html',
        'app/scripts/**/*.js',
        'app/img/**/*'
    ]).on('change', reload);

    gulp.watch('app/styles/**/*.scss', ['styles']);
    gulp.watch('bower.json', ['wiredep']);
});

gulp.task('wiredep', function () {
    var wiredep = require('wiredep').stream;

    gulp.src('app/styles/*.scss')
        .pipe(wiredep({
            // Ignore 1 or more “../”
            ignorePath: /^(\.\.\/)+/
        }))
        .pipe(gulp.dest('app/styles'));

    gulp.src('app/**/*.html')
        .pipe(wiredep({
            // Ignore 0 or more “../” followed by “../”.
            ignorePath: /^(\.\.\/)*\.\./
        }))
        .pipe(gulp.dest('app'));
});

/**
 * BUILD
 *
 * @param build is the name of this task that…
 * @param function is a callback function that…
 */
gulp.task('build', ['compress', 'html', 'images', 'extras'], function () {
    return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});


/**
 * DEFAULT
 *
 * @param default is the name of this task that…
 * @param function is a callback function that…
 */
gulp.task('default', ['clean'], function () {
    gulp.start('build');
});
