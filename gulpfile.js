let gulp = require("gulp");

let minify = require("gulp-minify");
let minifyCss = require("gulp-minify-css");
let stylus = require("gulp-stylus");
let concatCss = require("gulp-concat-css");

let inject = require("gulp-inject");

gulp.task("buildOld", () => {
    gulp.src("./public/js/**/*.js")
        .pipe(minify())
        .pipe(gulp.dest("public/build/"));

    gulp.src("./public/css/**/*.styl")
        .pipe(stylus())
        .pipe(concatCss("bundle.css"))
        .pipe(minifyCss())
        .pipe(gulp.dest("public/build"));

    gulp.src("./views/_layout.pug")
        .pipe(inject(gulp.src("./public/build/**/*.css", { read: false }), { relative: true }))
        .pipe(gulp.dest("./views/build"));
});

gulp.task("build", () => {
    gulp.src("./public/css/**/*.styl")
        .pipe(stylus())
        .pipe(concatCss("styles.min.css"))
        .pipe(minifyCss())
        .pipe(gulp.dest("./public/css/build"));

    const bootstrapCdnUrl = "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css";
    gulp.src("./views/_layout.pug")
        .pipe(inject(gulp.src(bootstrapCdnUrl, { read: false }), { starttag: "<!-- inject:bootstrap -->" }))
        .pipe(gulp.dest("./views/build"));
});