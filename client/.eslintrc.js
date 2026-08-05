module.exports = {
  parser: "@babel/eslint-parser",
  // configure browser, node, and test globals
  env: {
    "browser": true,
    "node": true,
    "mocha": true,
  },
  extends: [
    "eslint-config-airbnb-base",
    "eslint-config-prettier", // TODO: change to "plugin:prettier/recommended": https://github.com/prettier/eslint-plugin-prettier/blob/ca076d95aaf69aaf9c95abcc1692f8269197f248/README.md#configuration-legacy-eslintrc
  ],
  plugins: [
    "eslint-plugin-compat",
    "eslint-plugin-import",
    "eslint-plugin-json",
    "eslint-plugin-lit",
    "eslint-plugin-prettier",
    "eslint-plugin-promise",
    "eslint-plugin-unused-imports",
    "eslint-plugin-wc",
  ],
  rules: {
    // necessary configurations
    "import/no-extraneous-dependencies": ["error", {
      // make sure dev files' imports are considered devDeps: https://github.com/import-js/eslint-plugin-import/issues/1263#issuecomment-706680017
      "devDependencies": [
        "test/**/*.js",
        "webpack.*.js",
        "vite.config.js",
        "web-test-runner.config.js",
      ]
    }],
    // preferences
    // TODO: only override some of the Airbnb preferences: https://github.com/airbnb/javascript/blob/366bfa66380c08304101c6add46355696e90b348/packages/eslint-config-airbnb-base/rules/style.js#L336
    "no-restricted-syntax": ["off"],
    "import/prefer-default-export": ["off"],
    // to remove
    // TODO: this should be done for all non-render methods
    "class-methods-use-this": ["off"],
    // TODO: remove this and use private methods instead
    "no-underscore-dangle": ["off"],
  },
}
