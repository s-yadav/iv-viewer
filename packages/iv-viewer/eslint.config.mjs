import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    files: ['src/**/*.js'],
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'comma-dangle': ['error', 'always-multiline'],
      'semi': ['error', 'always'],
      'no-underscore-dangle': 'off',
      'class-methods-use-this': 'off',
      'no-plusplus': 'off',
      'space-before-function-paren': ['error', 'always'],
      'lines-between-class-members': 'off',
      'object-curly-newline': 'off',
      'one-var': 'off',
      'one-var-declaration-per-line': 'off',
      'no-mixed-operators': 'off',
      'max-len': ['error', { code: 160 }],
      'no-param-reassign': 'off',
    },
  },
];
