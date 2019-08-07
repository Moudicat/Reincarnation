require('babel-core/register')({
  presets: ['stage-2', ['latest-node', { target: 'current' }]],
  plugins: ['transform-decorators-legacy']
});

require('babel-polyfill');

require('./');
