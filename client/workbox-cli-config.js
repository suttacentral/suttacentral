module.exports = {
    'swDest': './build/default/sw-generated.js',
    'globDirectory': './build/default/',
    'globPatterns': [
        '**/*.js',
        '**/*.html',
        '**/*.json',
        'img/**/*',
        'img/home-page/**/*',
        'img/static-pages/**/*'
    ],
    'globIgnores': 'bower_components/webcomponentsjs/*'
};
