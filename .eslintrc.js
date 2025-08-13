module.exports = {
  env: {
    node: true,
    mocha: true,
    browser: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    // '@typescript-eslint/indent': 'warn',
    '@typescript-eslint/no-use-before-define': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-var-requires': 'warn',
    '@typescript-eslint/no-inferrable-types': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'warn',
    '@typescript-eslint/no-extra-semi': 'warn',
    'react/react-in-jsx-scope': 'off',
    'no-extra-semi': 'warn',
    'no-console': 'warn',
    'no-empty': 'off',

    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: 'class', next: '*' },
      { blankLine: 'always', prev: 'block-like', next: '*' },
      { blankLine: 'always', prev: 'function', next: '*' },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var'],
      },
    ],

    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
      },
    ],

    'id-match': 0,

    'prettier/prettier': 'error',
    'comma-dangle': ['error', 'only-multiline'],
    'max-len': [
      2,
      {
        code: 120,
        tabWidth: 2,
        ignoreUrls: true,
        ignoreComments: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
  },
}
