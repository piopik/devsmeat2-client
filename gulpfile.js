var src = {
    js: 'src/js/**/*',
    lessImporter: 'src/less/main.less',
    less: 'src/less/**/*.less',
    scssImporter: 'src/scss/main.scss',
    scss: 'src/scss/**/*.scss',
    html: 'src/**/*.html',
    utils: 'src/utils/**/*',
    img: 'src/img/**/*'
};

var dest = {
    js: 'dist/js/',
    css: 'dist/css/',
    html: 'dist/',
    utils: 'dist/utils/',
    img: 'dist/img/'
};

var argv = require('yargs').argv;

var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),

    less = require('gulp-less'),
    sass = require('gulp-sass');
postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),

    imageMin = require('gulp-imagemin'),

    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,

    babelify = require('babelify'),
    vueify = require('vueify'),
    browserify = require('browserify'),

    concat = require('gulp-concat'),
    del = require('del'),
    fs = require('fs');

gulp.task('js', function () {

    return browserify('./src/js/index.js')
        .transform(babelify, {presets: ['es2015'], plugins: ["transform-runtime"]})
        .transform(vueify)
        .bundle().on('error', function (error) {
            console.log(error.toString());
            this.emit('end')
        })
        .pipe(fs.createWriteStream("./dist/js/app.js"));
});

gulp.task('css', function () {

    var processors = [
        autoprefixer
    ];

    if (argv.s) {
        return gulp.src(src.scssImporter)
            .pipe(sourcemaps.init())
            .pipe(sass()).on('error', function (error) {
                console.log(error.toString());
                this.emit('end')
            })
            .pipe(concat('main.css'))
            .pipe(postcss(processors))
            .pipe(sourcemaps.write('/'))
            .pipe(gulp.dest(dest.css))
            .pipe(browserSync.stream());
    } else {
        return gulp.src(src.lessImporter)
            .pipe(sourcemaps.init())
            .pipe(less()).on('error', function (error) {
                console.log(error.toString());
                this.emit('end')
            })
            .pipe(concat('main.css'))
            .pipe(postcss(processors))
            .pipe(sourcemaps.write('/'))
            .pipe(gulp.dest(dest.css))
            .pipe(browserSync.stream());
    }
});

gulp.task('html', function () {
    return gulp.src(src.html)
        .pipe(gulp.dest(dest.html))
        .pipe(browserSync.stream());
});

gulp.task('utils', function () {
    return gulp.src(src.utils)
        .pipe(gulp.dest(dest.utils))
});

gulp.task('img', function () {
    if (argv.i) {
        del([
            dest.img + '**/*'
        ]);
        return gulp.src(src.img)
            .pipe(imageMin())
            .pipe(gulp.dest(dest.img))
            .pipe(browserSync.stream());
    } else {
        return null;
    }
});

gulp.task('watch', function () {

    gulp.watch(src.js, ['js']);

    if (argv.s) {
        gulp.watch(src.scss, ['css']);
    } else {
        gulp.watch(src.less, ['css']);
    }

    gulp.watch(src.html, ['html']);

    if (argv.i) {
        gulp.watch(src.img, ['img']);
    }

});

gulp.task('server', function () {
    browserSync.init(null, {
        server: {
            baseDir: "./dist/"
        }
    });
});

gulp.task('build', ['js', 'css', 'html', 'img', 'utils']);
gulp.task('start', ['build', 'watch', 'server']);
gulp.task('default', ['build']);