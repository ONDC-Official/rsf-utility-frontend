const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
  addWebpackAlias({
    '@components': path.resolve(__dirname, 'src/components'),
    '@pages': path.resolve(__dirname, 'src/pages'),
    '@theme': path.resolve(__dirname, 'src/theme'),
    '@types': path.resolve(__dirname, 'src/types'),
    '@interfaces': path.resolve(__dirname, 'src/interfaces'),
    '@constants': path.resolve(__dirname, 'src/constants'),
    '@data': path.resolve(__dirname, 'src/data'),
    '@routes': path.resolve(__dirname, 'src/routes'),
    '@styles': path.resolve(__dirname, 'src/styles'),
    '@services': path.resolve(__dirname, 'src/services'),
    '@hooks': path.resolve(__dirname, 'src/hooks'),
  })
);