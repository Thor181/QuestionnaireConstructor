//@ts-check
var gulp = require("gulp");

const concat = require('gulp-concat');
const minify = require('gulp-minify');

const src = ['wwwroot/css/blocks/**', 'wwwroot/css/modifiers/**', 'wwwroot/css/shared/consts.css', 'wwwroot/css/shared/site.css',];
const jsSrc = ['wwwroot/js/blocks/**'];

exports.default = function () {
    gulp.watch(src, { events: 'all',ignoreInitial: false }, function (cb) {
        gulp.src(src).pipe(concat('bundle.css')).pipe(gulp.dest('wwwroot/css/shared'));
        cb();
    });
};



 