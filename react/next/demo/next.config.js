// const withTypescript = require('@zeit/next-typescript');
const withCss = require('@zeit/next-css');

if (typeof require !== 'undefined') {
  require.extensions['.css'] = () => {};
}

module.exports = withCss({});
