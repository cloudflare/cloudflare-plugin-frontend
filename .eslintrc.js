module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      globalReturn: false,
      impliedStrict: true,
      jsx: true,
      experimentalObjectRestSpread: true
    },
    babelOptions: {
      configFile: './.babelrc.json'
    }
  },
  globals: {
    __webpack_public_path__: true,
    bootstrap: true,
    describe: true,
    it: true,
    beforeEach: true,
    afterEach: true,
    before: true,
    after: true,
    test: true,
    expect: true
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  plugins: ['prettier', 'react', 'import', 'json', 'cflint', 'compat', 'mocha'],
  extends: [
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:import/warnings'
  ],
  rules: {
    'mocha/no-exclusive-tests': 2,
    'block-scoped-var': 2,
    'default-case': 2,
    'guard-for-in': 2,
    'no-else-return': 2,
    'no-floating-decimal': 2,
    'no-self-compare': 2,
    'no-void': 2,
    radix: 2,
    'wrap-iife': ['error', 'inside'],
    'no-catch-shadow': 2,
    'handle-callback-err': 2,
    camelcase: 0,
    'no-unused-vars': [2, { vars: 'all', args: 'after-used' }],
    'no-undef': [2, { typeof: false }],
    'react/prop-types': [2, { skipUndeclared: true }],
    'import/no-absolute-path': 2,
    'import/no-deprecated': 1,
    'import/no-mutable-exports': 1,
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 0,
    'import/first': 1,
    'prettier/prettier': [2, { trailingComma: 'none', singleQuote: true }],
    'compat/compat': 0,
    'no-use-before-define': ['error', { functions: false, classes: true }]
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: './webpack.config.js'
      }
    },
    react: {
      version: 'detect'
    }
  }
};
