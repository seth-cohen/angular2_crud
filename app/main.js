
// Set up the configuration for Require.js.  Tell it where our "non-module" JS files are.
require.config({
  paths: {
    'underscore': 'libs/underscore-1.8.3'
  },
  shim: {
    'underscore': {
      exports: '_'
    }
  }
});

require(
  [
    'jquery',
    'underscore'
  ], 
  function ($, _) {
    _.each([1, 2, 3], function (number) {
      console.log(number);
    });
});
(function(app) {
  document.addEventListener('DOMContentLoaded', function() {
    ng.platform.browser.bootstrap(app.AppComponent);
  });
})(window.app || (window.app = {}));