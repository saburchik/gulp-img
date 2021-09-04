let projectFolder = 'dist'
let sourceFolder = 'src'

let path = {
    build: {
        img: projectFolder + "/img/",
    },
    src: {
        img: sourceFolder + '/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}'
    },
    watch: {
        img: sourceFolder + '/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}'
    },
    clean: './' + projectFolder + '/'
}

let { src, dest } = require('gulp'),
    gulp = require('gulp'),
    del = require('del'),
    imagemin = require('gulp-image'),
    webp = require("gulp-webp");

function images() {
    return src(path.src.img)
        .pipe(
            webp({
                quality: 70
            })
        )
        .pipe(dest(path.build.img))
        .pipe(src(path.src.img))
        .pipe(
            imagemin({
                progressive: true,
                svgoPlugins: [{ removeViewBox: false }],
                interlaced: true,
                optimizationLevel: 4 // 0 to 7
            })
        )
        .pipe(dest(path.build.img))
}

function watchFiles() {
    gulp.watch([path.watch.img], images)
}

function clean() {
    return del(path.clean)
}

let build = gulp.series(clean, images)
let watch = gulp.parallel(build, watchFiles)

exports.images = images
exports.build = build
exports.watch = watch
exports.default = watch