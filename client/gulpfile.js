const gulp = require('gulp');
const i18nPreprocess = require('gulp-i18n-preprocess');

gulp.task('preprocess', function () {
    const options = {
        replacingText: false, // does not replace strings with {{annotations}}
        jsonSpace: 2, // JSON stringification parameter for formatting
        srcPath: 'app', // base source path
        force: false, // does not force preprocessing when i18n-behavior.html is not imported
        dropHtml: false, // does not drop the preprocessed HTML for output
        dropJson: false, // does not drop the extracted JSON files for output
        constructAttributesRepository: false, // does not construct localizable attributes repository
        attributesRepositoryPath: null // does not specify the path to i18n-attr-repo.html
    };

    return gulp.src([ 'app/elements/**/*.html' ])
    .pipe(i18nPreprocess(options))
    .pipe(gulp.dest('dist/elements'));
});