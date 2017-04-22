var src = {
    js: ['src/js/main.js'],
    lessImporter: 'src/less/main.less',
    less: 'src/less/**/*.less',
    scssImporter: 'src/scss/main.scss',
    scss: 'src/scss/**/*.scss',
    html: 'src/**/*.html',
    utils: 'src/utils/**/*',
    icons: 'src/icons/*.svg',
    fonts: 'src/fonts/*',
    img: 'src/img/**/*'
};

var dest = {
    js: 'dist/js/',
    css: 'dist/css/',
    html: 'dist/',
    utils: 'dist/utils/',
    icons: 'dist/fonts/',
    fonts: 'dist/fonts/',
    img: 'dist/img/'
};

var argv = require('yargs').argv;

var gulp            = require('gulp'),
    babel           = require('gulp-babel'),
    minifyJS        = require('gulp-uglify'),
    sourcemaps      = require('gulp-sourcemaps'),
    less            = require('gulp-less'),
    sass            = require('gulp-sass');
    iconfont        = require('gulp-iconfont'),
    iconfontCss     = require('gulp-iconfont-css'),
    concat          = require('gulp-concat'),
    imageMin        = require('gulp-imagemin'),
    browserSync     = require('browser-sync').create(),
    reload          = browserSync.reload,
    postcss         = require('gulp-postcss'),
    autoprefixer    = require('autoprefixer'),
    cssnano         = require('cssnano'),
    postcssFontMagician = require('postcss-font-magician')({}),
    git             = require('gulp-git'),
    del             = require('del');

var runTimestamp = Math.round(Date.now()/1000);

gulp.task('js', function () {

    if(argv.p){
        return gulp.src(src.js)
            .pipe(babel({
                presets: ['es2015']
            }))
            .pipe(gulp.dest(dest.js))
    } else {
        return gulp.src(src.js)
            .pipe(babel({
                presets: ['es2015']
            }))
            .pipe(minifyJS().on('error', function(error){
                console.log(error.toString());
                this.emit('end')
            }))
            .pipe(gulp.dest(dest.js))
    }
});

gulp.task('css', function () {
    var processors = [
        autoprefixer,
        // postcssFontMagician
    ];

    if(!argv.p){
        processors.push(cssnano)
    }

    var fs = require('fs');
    fs.stat('./src/less/pack.less', function(err, stat) {
        if(err == null) {
            src.lessImporter = ['src/less/pack.less', src.lessImporter ]
        }

        if(argv.s){
            return gulp.src(src.scssImporter)
                .pipe(sourcemaps.init())
                .pipe(sass()).on('error', function(error){
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
                .pipe(less()).on('error', function(error){
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


});

gulp.task('html', function () {
    return gulp.src(src.html)
        .pipe(gulp.dest(dest.html))
});

gulp.task('utils', function () {
    return gulp.src(src.utils)
        .pipe(gulp.dest(dest.utils))
});

gulp.task('fonts', function () {
    return gulp.src(src.fonts)
        .pipe(gulp.dest(dest.fonts))
});

gulp.task('icons', function () {
    del([
        dest.fonts+'**/*'
    ]);
    return gulp.src(src.icons)
        .pipe(iconfontCss({
            fontName: 'icon-font',
            path: 'src/icons/_template.css',
            targetPath: 'icon-font.css'
        }))
        .pipe(iconfont({
            fontName: 'icon-font',
            prependUnicode: true,
            formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'],
            fontHeight: 512,
            descent: 70,
            timestamp: runTimestamp
        }))
        .pipe(gulp.dest(dest.fonts))
});

gulp.task('img', function () {
    if(argv.i){
        del([
            dest.img+'**/*'
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

    gulp.watch(src.js, ['js']).on("change", reload);

    if(argv.s){
        gulp.watch(src.scss, ['css']);
    } else {
        gulp.watch(src.less, ['css']);
    }

    gulp.watch(src.html, ['html']).on("change", reload);
    gulp.watch(src.icons, ['icons']).on("change", reload);
    gulp.watch(src.fonts, ['fonts']).on("change", reload);

    if(argv.i){
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


gulp.task('pack', function () {

    if(argv.s){

        git.clone('http://gitlab.sosoftware.pl/front/sointeractive-common-styles.git', {args: './pack'}, function(err) {

            return Promise.all([
                new Promise(function(resolve, reject) {
                    gulp.src('./pack/dist/pack.css')
                        .pipe(gulp.dest('./dist/css'))
                        .on('error', reject)
                        .on('end', resolve)
                }),
                new Promise(function(resolve, reject) {
                    gulp.src('./pack/dist/pack.css.map')
                        .pipe(gulp.dest('./dist/css'))
                        .on('error', reject)
                        .on('end', resolve)
                }),
                new Promise(function(resolve, reject) {
                    gulp.src('./pack/dist/pack.js')
                        .pipe(gulp.dest('./dist/js/'))
                        .on('error', reject)
                        .on('end', resolve)
                }),
                new Promise(function(resolve, reject) {
                    gulp.src('./pack/dist/img/*')
                        .pipe(gulp.dest('./dist/img'))
                        .on('error', reject)
                        .on('end', resolve)
                }),
                new Promise(function(resolve, reject) {
                    gulp.src('./pack/dist/fonts/*')
                        .pipe(gulp.dest('./dist/fonts'))
                        .on('error', reject)
                        .on('end', resolve)
                }),
                new Promise(function(resolve, reject) {
                    gulp.src('./pack/dist/utils/*')
                        .pipe(gulp.dest('./dist/utils'))
                        .on('error', reject)
                        .on('end', resolve)
                }),
                new Promise(function(resolve, reject) {
                    gulp.src('./pack/dist/pack.less')
                        .pipe(gulp.dest('./src/less'))
                        .on('error', reject)
                        .on('end', resolve)
                })
            ]).then(function () {
                console.log('Pack installed');
                gulp.src('./pack', {read: false});
                del([
                    './pack/**/*'
                ]);
            });

        });

    } else if(argv.c){
        console.log('Comarch pack not defined yet');
    } else {
        console.log('Usage: gulp pack -(soi|ca)');
    }

});

gulp.task('build', ['js', 'css', 'html', 'icons', 'fonts', 'img']);
gulp.task('start', ['build', 'watch', 'server']);
gulp.task('default', ['build']);