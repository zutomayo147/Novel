module.exports = {
  extends: 'stylelint-config-standard',
  overrides: [
    {
      files: ['**/*.{js,jsx,ts,tsx}'],
      customSyntax: '@stylelint/postcss-css-in-js'
    }
  ]
}