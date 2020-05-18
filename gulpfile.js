const gulp = require('gulp');
    sass = require('gulp-sass');
    autoprefixer = require('gulp-autoprefixer');
    clean = require('gulp-clean');
    browserSync = require('browser-sync');
    imagemin = require('gulp-imagemin');

const path = {
    build: {
        html: 'build',
        css: 'build/css/',
        img: 'build/img/',
    },
    src: {
        html: 'src/index.html',
        scss: 'src/scss/**/*.scss',
        img: 'src/img/**/*.png',
    },
    clean: './build/'
};

// const htmlBuild = () => {
//     return gulp.src(path.src.html)
//         .pipe(gulp.dest(path.build.html))
// };
const imgBuild = () => {
    return gulp.src(path.src.img)
        .pipe(imagemin())
        .pipe(gulp.dest(path.build.img))
};
const scssBuild = () => {
    return gulp.src(path.src.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 100 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(path.build.css));
};
const cleanBuild = () => {
    return gulp.src(path.clean, {allowEmpty:true})
        .pipe(clean())
};
const watcher = () => {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    // gulp.watch(path.src.html, htmlBuild).on('change', browserSync.reload);
    gulp.watch(path.src.scss, scssBuild).on('change', browserSync.reload);
};

// gulp.task('html', htmlBuild);
gulp.task('img', imgBuild);
gulp.task('scss', scssBuild);
gulp.task('clean', cleanBuild);
gulp.task('default', gulp.series(
    cleanBuild,
    imgBuild,
    scssBuild,
    watcher,
));