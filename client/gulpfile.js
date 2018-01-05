const gulp = require('gulp');
const i18nPreprocess = require('gulp-i18n-preprocess');

// Global object to store localizable attributes repository
let attributesRepository; // constructed attributes repository

// Other standard pipes such as crisper / minification / uglification are omitted for explanation
gulp.task('preprocess', function () {
    const elements = gulp.src(['elements/static/**/*.html']) // input custom element HTMLs
        .pipe(i18nPreprocess({
            replacingText: true, // replace UI texts with {{annotations}}
            jsonSpace: 2, // JSON format with 2 spaces
            attributesRepository: attributesRepository // input attributes repository
        }))
        .pipe(gulp.dest('localization/i18nOutput')); // output preprocessed HTMLs and default JSON files to dist

    return elements;
});
