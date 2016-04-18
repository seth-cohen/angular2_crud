/*
 * Seth Cohen <seth.h.cohen@gmail.com>
 */

/*
 * Class encapsulating the user specific data
 *
 * Seth Cohen <seth.h.cohen@gmail.com>
 */
define(['underscore', './address'], function(_, Address) {
  var User = ng.core.Class({
    constructor: function(data) {
      this.address = new Address();
      this.set(data);
    },

    /**
     * Sets properties from data object
     *
     * @param {object} data Object to populate the object from
     * @returns {boolean}
     */
    set: function(data) {
      if (typeof data !== 'object') {
        return false;
      }
      this.userID = data.userID || '';
      this.firstName = data.firstName || '';
      this.lastName = data.lastName || '';
      this.email = data.email || '';
      this.telephone = data.telephone || '';
      this.address.set(data.address || {});

      return true;
    },

    /**
     * Does some really lightweight validation of the model - really 'are all attributes present'
     *
     * @returns {boolean}
     */
    isValid: function() {
      var validAddress = this.address.isValid();
      var self = this;

      return (validAddress && !_.any(_.keys(this), function(key) {
          // New users will not have an ID so we shouldn't require it
          if (key === 'userID') {
            return false;
          }
          return (self[key] == null || self[key] === '' || _.isEmpty(self[key]));
        })
      );
    }
  });

  return User;
});