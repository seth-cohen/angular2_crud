// Set up the configuration for Require.js.  Tell it where our "non-module" JS files are.
require.config({
  baseUrl: 'app/js',
  paths: {
    'underscore': 'libs/underscore-1.8.3'
  },
  shim: {
    'underscore': {
      exports: '_'
    }
  },
  deps: ['app.component']
});