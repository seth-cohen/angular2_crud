/*
 * The user switcher service, used to select remote or local storage
 *
 * Seth Cohen <seth.h.cohen@gmail.com>
 */
define([], function() {
  var StorageSelectorService = ng.core.Class({
    constructor: function() {
      this.useRemoteStorage = false;
    },

    toggleStorage: function() {
      this.useRemoteStorage = !this.useRemoteStorage;
      return this.useRemoteStorage;
    }
  });

  return StorageSelectorService;
});