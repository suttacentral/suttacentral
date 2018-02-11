module.exports = {
    'swDest': './build/default/sw-generated.js',
    'globDirectory': './build/default/',
    'globPatterns': [
        '**/*.js',
        '**/*.html',
        '**/*.json',
        'img/**/*',
        'img/home-page/**/*',
        'img/static-pages/**/*',
        'files/fonts/**/*.otf',
        'files/fonts/**/*.woff2'
    ],
    'globIgnores': 'bower_components/webcomponentsjs/*'
};
