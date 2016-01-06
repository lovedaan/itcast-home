/*
 * @Author: iceStone
 * @Date:   2015-08-31 11:40:15
 * @Last Modified by:   iceStone
 * @Last Modified time: 2015-09-17 23:06:25
 */

/*import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import del from 'del';
import {
    stream as wiredep
}
from 'wiredep';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;*/

var gulp = require("gulp");
var gulpLoadPlugins = require("gulp-load-plugins");
var browserSync = require("browser-sync");
var del = require("del");
var wiredep = require("wiredep");

var $ = gulpLoadPlugins();
var reload = browserSync.reload;

gulp.task('styles', function() {
    return gulp.src('src/styles/*.scss')
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.sass.sync({
            outputStyle: 'expanded',
            precision: 10,
            // includePaths: ['']
        }).on('error', $.sass.logError))
        .pipe($.autoprefixer({
            browsers: ['last 1 version']
        }))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('temp/styles'))
        .pipe(reload({
            stream: true
        }));
});

function lint(files, options) {
    return function() {
        return gulp.src(files)
            .pipe(reload({
                stream: true,
                once: true
            }))
            .pipe($.eslint(options))
            .pipe($.eslint.format())
            .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
    };
}
var testLintOptions = {
    env: {
        mocha: true
    }
};

gulp.task('lint', lint('src/scripts/**/*.js'));
gulp.task('lint:test', lint('test/spec/**/*.js', testLintOptions));

gulp.task('html', ['styles'], function() {
    var assets = $.useref.assets({
        searchPath: ['temp', 'src', '.']
    });

    return gulp.src('src/*.html')
        .pipe(assets)
        .pipe($.if('*.js', $.uglify()))
        .pipe($.if('*.css', $.minifyCss({
            compatibility: '*'
        })))
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe($.if('*.html', $.minifyHtml({
            conditionals: true,
            loose: true
        })))
        .pipe(gulp.dest('dist'));
});

gulp.task('images', function() {
    return gulp.src('src/images/**/*')
        .pipe($.if($.if.isFile, $.cache($.imagemin({
                progressive: true,
                interlaced: true,
                // don't remove IDs from SVGs, they are often used
                // as hooks for embedding and styling
                svgoPlugins: [{
                    cleanupIDs: false
                }]
            }))
            .on('error', function(err) {
                console.log(err);
                this.end();
            })))
        .pipe(gulp.dest('dist/web/images'));
});

gulp.task('fonts', function() {
    return gulp.src(require('main-bower-files')({
            filter: '**/*.{eot,svg,ttf,woff,woff2,otf}'
        }).concat('src/fonts/**/*'))
        .pipe(gulp.dest('temp/fonts'))
        .pipe(gulp.dest('dist/web/fonts'));
});

gulp.task('extras', function() {
    return gulp.src([
        // 'src/*',
        'src/*.*',
        '!src/*.html',
        '!src/images/*',
        '!src/styles/*',
        '!src/scripts/*',
        '!src/manifest',
        '!src/robots.txt'
    ], {
        dot: true
    }).pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['temp', 'dist']));

gulp.task('server', ['styles', 'fonts'], function() {
    browserSync({
        notify: false,
        port: 2015,
        server: {
            baseDir: ['temp', 'src'],
            routes: {
                '/bower_components': 'bower_components'
            }
        }
    });

    gulp.watch([
        'src/*.html',
        'src/scripts/**/*.js',
        'src/images/**/*',
        '.tmp/fonts/**/*'
    ]).on('change', reload);

    gulp.watch('src/styles/**/*.scss', ['styles']);
    gulp.watch('src/fonts/**/*', ['fonts']);
    gulp.watch('bower.json', ['wiredep', 'fonts']);
});

gulp.task('server:dist', function() {
    browserSync({
        notify: false,
        port: 2015,
        server: {
            baseDir: ['dist']
        }
    });
});

gulp.task('server:test', function() {
    browserSync({
        notify: false,
        port: 2015,
        ui: false,
        server: {
            baseDir: 'test',
            routes: {
                '/bower_components': 'bower_components'
            }
        }
    });

    gulp.watch('test/spec/**/*.js').on('change', reload);
    gulp.watch('test/spec/**/*.js', ['lint:test']);
});

// inject bower components
gulp.task('wiredep', function() {
    gulp.src(['src/styles/*.scss','!src/styles/_*.scss'])
        .pipe(wiredep({
            ignorePath: /^(\.\.\/)+/
        }))
        .pipe(gulp.dest('src/styles'));
    gulp.src('./src/*.html')
        .pipe(wiredep({
            ignorePath: /^(\.\.\/)*\.\./
        }))
        .pipe(gulp.dest('src'));
});

gulp.task('build', ['lint', 'html', 'images', 'fonts', 'extras'], function() {
    return gulp.src('dist/**/*').pipe($.size({
        title: 'build',
        gzip: true
    }));
});

gulp.task('deploy', function() {
    return gulp.src('dist/**/*')
        .pipe($.ghPages());
});

gulp.task('default', ['clean'], function() {
    gulp.start('build');
});
