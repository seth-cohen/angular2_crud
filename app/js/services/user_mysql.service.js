/*
 * The user MySQL service. This service can be injected into Angular2 components or services, and
 * is used for User data access. This particular service will be used to save relational data to
 * a MySQL database running on the same server as the application
 *
 * Seth Cohen <seth.h.cohen@gmail.com>
 */
define(['../models/user'], function(User) {
  var UserMySQLService = ng.core.Class({
    constructor: [ng.http.Http, function(http) {
      this.http = http;
    }],

    /**
     * Gets a single user by ID
     *
     * @param id
     * @returns {object}
     */
    get: function(id) {
      if (id) {
        var headers = new ng.http.Headers({'Content-Type': 'application/json'});
        var options = new ng.http.RequestOptions({headers: headers});

        return this.http.get('/user/' + id, options).map(res => res.json());
      }
    },

    /**
     * Gets all users stored in localStorage
     *
     * @returns {array}
     */
    getAll: function() {
      var headers = new ng.http.Headers({'Content-Type': 'application/json'});
      var options = new ng.http.RequestOptions({headers: headers});

      return this.http.get('/users', options).map(res => res.json());
    },

    /**
     * Creates user newUser in persistence and associated address entry
     *
     * @param {User} newUser Object encapsulating the user data
     * @returns {boolean}
     */
    create: function(newUser) {
      if (newUser instanceof User) {
        var headers = new ng.http.Headers({'Content-Type': 'application/json'});
        var options = new ng.http.RequestOptions({headers: headers});

        return this.http.post(
          '/user',
          JSON.stringify(newUser),
          options
        )
        .map(res => res.json());
      } else {
        return Rx.Observable.create(function (observer) {
          observer.next(false);
        });
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
        if (id) {
          var headers = new ng.http.Headers({'Content-Type': 'application/json'});
          var options = new ng.http.RequestOptions({headers: headers});

          return this.http.delete('/user/' + id, options).map(res => res.json());
        }
      }
    },

    /**
     * Updates the user updateUser in persistence
     *
     * @param {User} updateUser The user that we are updating - contains the updated values
     * @returns {boolean}
     */
    update: function(updateUser) {
      if (updateUser instanceof User) {
        var headers = new ng.http.Headers({'Content-Type': 'application/json'});
        var options = new ng.http.RequestOptions({headers: headers});

        return this.http.put(
          '/user',
          JSON.stringify(updateUser),
          options
        )
        .map(res => res.json());
      } else {
        return Rx.Observable.create(function (observer) {
          observer.next(false);
        });
      }
    }
  });

  return UserMySQLService;
});