module.exports = {
    'swSrc': './build/default/service-worker.js',
    'swDest': './build/default/sw-generated.js',
    'globDirectory': './build/default/',
    'globPatterns': [
        '/',
        'index.html',
        'elements/**/*.html',
        'elements/*.html',
        'elements/styles/*.json',
        'localization/elements/**/en.json',
        'img/pray.png',
        'img/*.svg',
        'files/fonts/RaloksPE-Bold_3.007.woff2',
        'files/fonts/RaloksPE-Regular_3.007.woff2',
        'files/fonts/RaloksSansPE-Bd_2.004.woff2',
        'files/fonts/RaloksSansPE-It_2.004.woff2',
        'files/fonts/RaloksSansPE-Rg_2.004.woff2'
    ],
    'globIgnores': [
        'bower_components/webcomponentsjs/*',
        'elements/static-templates/*'
    ]
};
