const { rules } = require('eslint-plugin-react')

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    '@electron-toolkit/eslint-config-ts/recommended'
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'ignore',
    '@typescript-eslint/explicit-function-return-type': [
      'warn',
      {
        allowHigherOrderFunctions: true
      }
    ]
  }
}
//'@electron-toolkit/eslint-config-prettier'
