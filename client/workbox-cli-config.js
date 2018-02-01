module.exports = {
    'globDirectory': 'build/default/',
    'globPatterns': [
        'bower_components/*.{js|html|css}',
        'node_modules/*.{js|html|css}',
        'img/**/*.{png|ico|svg|jpg}',
        'localization/**/*.json',
        '*.{json|html|js}'
    ],
    'swDest': "build/default/sw-generated.js"
};