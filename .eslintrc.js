module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'airbnb-typescript',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: [
    'react',
  ],
  rules: {
    'linebreak-style': 0,
    'no-underscore-dangle': 0,
    'react/prop-types': 0, // TODO: Disable only in TSX files
    '@typescript-eslint/type-annotation-spacing': 1,
    '@typescript-eslint/member-delimiter-style':1,
  },
};
