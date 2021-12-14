module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  rules: {
    '@typescript-eslint/no-empty-interface': 0,
    '@typescript-eslint/no-unused-vars': [
      "warn",
      {
        "argsIgnorePattern": "^_"
      }
    ]
  },
  env: {
    node: true
  }
};
