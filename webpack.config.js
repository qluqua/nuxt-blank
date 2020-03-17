const resolve = require('path').resolve;

module.exports = {
  resolve: {
    modules: [resolve(__dirname, 'lib'), 'node_modules'],
    extensions: ['.ts', '.js', '.vue'],
    alias: {
      '@': resolve(__dirname),
    },
  },
};
