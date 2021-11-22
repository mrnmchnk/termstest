let { src, dest } = require('gulp');
let gulp = require('gulp');
let browsersync = require('browser-sync').create();
let sass = require('gulp-sass')(require('sass'));
let autoprefixer = require('gulp-autoprefixer');
let mediaCss = require('gulp-group-css-media-queries');
let cleanCss = require('gulp-clean-css');
let uglify = require('gulp-uglify-es').default;
let rename = require('gulp-rename');
let fileInclude = require('gulp-file-include');

let path = {
    src: {
        html: '*.html',
        scss: 'src/scss/*.scss',
        js: 'src/js/*.js',
        img: 'src/img/*.{svg,png,jpeg,jpg,gif}'
    },

    build: {
        css: 'dist/css/',
        js: 'dist/js/',
        img: 'dist/img/'
    },

    watch: {
        html: '*.html',
        scss: 'src/scss/**/*.scss',
        js: 'src/js/**/*.js',
        img: 'src/img/**/*.{svg,png,jpeg,jpg,gif}'
    }
}


function browserSync() {
    browsersync.init({
        server: {
            baseDir: "./"
        },
        notify: false
    });
}

function html() {
    return src(path.src.html)
        .pipe(browsersync.stream())
}

function css() {
    return src(path.src.scss)
        .pipe(sass())
        .pipe(autoprefixer({
            cascade: true
        }))
        .pipe(mediaCss())
        .pipe(dest(path.build.css))
        .pipe(cleanCss())
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
}

function js() {
    return src(path.src.js)
        .pipe(fileInclude())
        .pipe(dest(path.build.js))
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
}

function img() {
    return src(path.src.img)
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream())
}

function watchFiles() {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.scss], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], img);
}

exports.default = gulp.parallel(html, css, js, img, watchFiles, browserSync);