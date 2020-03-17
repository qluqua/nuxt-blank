module.exports = {
  root: true,
  // https://github.com/airbnb/javascript/blob/master/README.md
  // https://eslint.vuejs.org/rules/#priority-c-recommended-minimizing-arbitrary-choices-and-cognitive-overhead
  extends: [
    'airbnb-base',
    'plugin:vue/recommended',
    'plugin:jest/recommended',
  ],
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  parserOptions: {
    // https://eslint.vuejs.org/user-guide/#what-is-the-use-the-latest-vue-eslint-parser-error
    parser: 'babel-eslint',
    ecmaVersion: 2019,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      'webpack': 'webpack.config.js',
    },
  },
  // https://eslint.org/docs/user-guide/configuring#specifying-environments
  // https://eslint.org/docs/user-guide/configuring#specifying-globals
  globals: {
    process: true,
  },
  // https://eslint.org/docs/user-guide/configuring#configuring-plugins
  // https://github.com/vuejs/eslint-plugin-vue
  plugins: [
    'vue', // required to lint *.vue files
    'jest',
  ],
  // add your custom rules here
  rules: {
    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state', // for vuex state
        'acc', // for reduce accumulators
        'e', // for e.returnvalue
      ],
    }],
    // for vuex modules
    'no-shadow': ['error', {
      allow: ['state', 'getters'],
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      optionalDependencies: ['test/unit/index.js'],
    }],
    'import/prefer-default-export': 0,
    // allow async-await
    'generator-star-spacing': 'off',
    'space-before-function-paren': 'off',
    'no-mixed-operators': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
    'jest/no-identical-title': 'error',
    'jest/no-jest-import': 'error',
    'jest/prefer-to-be-null': 'warn',
    'jest/prefer-to-be-undefined': 'warn',
    'jest/prefer-to-have-length': 'warn',
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/no-v-html': 'off',
    'vue/attribute-hyphenation': ['error', 'never'],
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        indent: 'off',
        'max-len': ['error', 100, 2, {
          ignoreUrls: true,
          ignoreComments: false,
          ignoreRegExpLiterals: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
        }],
      },
    },
  ],
};

