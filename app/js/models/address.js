/*
 * Class encapsulating the address specific data
 *
 * Seth Cohen <seth.h.cohen@gmail.com>
 */
define([], function() {
  var Address = ng.core.Class({
    constructor: function(data) {
      this.set(data);
    },

    /**
     * Sets properties from data object
     *
     * @param {object} data The data to populate the address from
     * @returns {boolean}
     */
    set: function(data) {
      if (typeof data !== 'object') {
        return false;
      }

      this.street = data.street || '';
      this.city = data.city || '';
      this.state = data.state || '';
      this.zip = data.zip || '';

      return true;
    },

    /**
     * Does some really lightweight validation of the model - really 'are all attributes present'
     *
     * @returns {boolean}
     */
    isValid: function() {
      return !_.any(_.values(this), function(attr) {
        return (attr == null || attr === '' || _.isEmpty(attr));
      });
    }
  });

  return Address;
});