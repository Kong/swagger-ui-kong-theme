// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    'mocha': true,
  },
  globals: {
    'expect': true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: [
    'plugin:vue/essential',
    'standard',
    'plugin:import/errors',
    'plugin:import/warnings'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  },
  settings: {
    'import/resolver': {
      'webpack':
        {
          'config': './build/webpack.prod.conf.js'
        }
    }
  }
}
