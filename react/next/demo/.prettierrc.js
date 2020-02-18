module.exports = {
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
  semi: true,
  bracketSpacing: true,
  overrides: [
    {
      files: '.prettierrc',
      options: { parser: 'json' }
    }
  ]
};
