/*
 * The user service. This service can be injected into Angular2 components or services, and
 * is used for User data access. This particular service will be used to save JSON data to
 * localStorage on the client
 *
 * Seth Cohen <seth.h.cohen@gmail.com>
 */
define(['../models/user'], function(User) {
  var UserService = ng.core.Class({
    constructor: function() {},

    /**
     * Gets a single user by ID
     *
     * @param id
     * @returns {object}
     */
    get: function(id) {
      var users = JSON.parse(localStorage.getItem('users'));
      if (id) {
        return users[id] ? users[id] : {};
      }
    },

    /**
     * Gets all users stored in localStorage
     *
     * @returns {array}
     */
    getAll: function() {
      return _.values(JSON.parse(localStorage.getItem('users')));
    },

    /**
     * Creates user newUser in persistence and associated address entry
     *
     * @param {User} newUser Object encapsulating the user data
     * @returns {boolean}
     */
    create: function(newUser) {
      // Let's get the current identity seed. If not already set then let's initialize it.
      var currentID = localStorage.getItem('currentID') || 1;
      if (newUser instanceof User) {
        newUser.userID = currentID;

        // Unfortunately, since we are using localStorage here, we need to retrieve the entire
        // users object in storage to add the new user.
        var users = JSON.parse(localStorage.getItem('users')) || {};
        users[currentID] = newUser;

        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentID', parseInt(currentID, 10) + 1);

        return true;
      } else {
        return false;
      }
    },

    /**
     * Delete the user with userID from persistence
     *
     * @param {number} userID ID of the user to delete
     * @returns {boolean}
     */
    delete: function(userID) {
      var id = parseInt(userID, 10);
      if (!isNaN(id)) {
        var users = JSON.parse(localStorage.getItem('users')) || {};
        if (users[id]) {
          delete(users[id]);
          localStorage.setItem('users', JSON.stringify(users));
          return true;
        }
      }
      return false;
    },

    /**
     * Updates the user updateUser in persistence
     *
     * @param {User} updateUser The user that we are updating - contains the updated values
     * @returns {boolean}
     */
    update: function(updateUser) {
      if (updateUser instanceof User) {
        var id = parseInt(updateUser.userID, 10);
        if (!isNaN(id)) {
          var users = JSON.parse(localStorage.getItem('users')) || {};
          if (users[id]) {
            users[id] = updateUser;
            localStorage.setItem('users', JSON.stringify(users));
            return true;
          }
        }
      }
      return false;
    }
  });

  return UserService;
});