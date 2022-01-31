import gulp from 'gulp';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import watch from 'gulp-watch';
import pngquant from 'imagemin-pngquant';
import cache from 'gulp-cache';
import imagemin from 'gulp-imagemin';
import cssnano from 'gulp-cssnano';
import rename from 'gulp-rename';
import concatCss from 'gulp-concat-css';
import del from 'del';
import minify from 'gulp-minify';

const PATH = {
    dev: {
        index: './',
        img: 'img/*',
        scss: './scss/*',
        css: './css/', 
        css_libs: './css/libs/*.css',
        js: './js/*',
        files: './files/**/*'
    },
    dist: {
        index: 'dist/',
        img: 'dist/img',
        css: 'dist/css',
        js: 'dist/js',
        files: 'dist/files'
    }
}


gulp.task('watch', function () {
    gulp.watch(PATH.dev.scss, gulp.series('scss'))
})

gulp.task('scss', function () {
    return gulp.src(PATH.dev.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(cssnano())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(PATH.dev.css))
})

gulp.task('css-libs', gulp.series(
    function () {
        return gulp.src(PATH.dev.css_libs)
            .pipe(concatCss("./libs.css"))
            .pipe(gulp.dest(PATH.dev.css));
    },
    function () {
        return gulp.src(PATH.dev.css + 'libs.css')
            .pipe(cssnano())
            .pipe(rename({ suffix: '.min' }))
            .pipe(gulp.dest(PATH.dev.css));
    }));


gulp.task('image', function (done) {
    gulp.src(PATH.dev.img).pipe(cache(imagemin({
        interlaced: true,
        progressive: true,
        svgoplugins: [{ removeViewBox: false }],
        use: [pngquant()]
    }))).pipe(gulp.dest(PATH.dist.img));
    done();
})

gulp.task('compress', function() {
 return  gulp.src('js/*.js')
      .pipe(minify())
      .pipe(gulp.dest('dist/js'));
  });


gulp.task('clear', function () {
    return cache.clearAll();
});

gulp.task('clean', function () {
    return del.sync('dist');
});




gulp.task('build', gulp.series('image', 'scss', 'css-libs', 'compress' ,  function (done) {
    gulp.src(PATH.dev.css + 'main.min.css').pipe(gulp.dest(PATH.dist.css));
    gulp.src(PATH.dev.css + 'libs.min.css').pipe(gulp.dest(PATH.dist.css));
    gulp.src(PATH.dev.index + 'index.html').pipe(gulp.dest(PATH.dist.index));
    gulp.src(PATH.dev.js).pipe(gulp.dest(PATH.dist.js));
    gulp.src(PATH.dev.files).pipe(gulp.dest(PATH.dist.files));
    done();
}));

