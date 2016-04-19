/**
 * Database Connection File
 *
 * Seth Cohen <seth.h.cohen@gmail.com>
 */
var mysql = require('mysql');

function getDB() {
  var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'cyber',
    multipleStatements: true
  });

  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
  });

  return connection;
}

/**
 * Transform data returned from DB to that which can be consumed by the app
 *
 * @param data
 * @returns {object}
 */
function transformUserResult(data) {
  return {
    userID: data.userID || '',
    firstName: data.firstName || '',
    lastName: data.lastName || '',
    email: data.email || '',
    telephone: data.telephone || '',
    address: {
      street: data.street || '',
      city: data.city || '',
      state: data.state || '',
      zip: data.zip || ''
    }
  };
}

var DB = {
  /**
   * Create User
   *
   * @param {object} newUser
   * @param {function} callback
   */
  createUser: function(newUser, callback) {
    if (typeof newUser === 'object') {
      var con = getDB();

      var userData = {
        FirstName: newUser.firstName,
        LastName: newUser.lastName,
        Email: newUser.email,
        Telephone: newUser.telephone
      };

      var address = newUser.address;
      var addressData = {
        Street: address.street,
        City: address.city,
        State: address.state,
        Zip: address.zip
      };

      var query = con.query(
        'START TRANSACTION;' +
        'INSERT INTO tblUser SET ?;' +
        'SET @UserID = LAST_INSERT_ID();' +
        'INSERT INTO tblAddress SET `UserID` = @UserID, ?;' +
        'SELECT @UserID as id;' +
        'COMMIT;',
        [userData, addressData],
        function(error, result) {
          if (error) {
            console.log(error.message);
            callback(false);
          } else {
            callback(result[4][0]);
          }
          con.end();
        }
      );
    } else {
      callback(false);
    }
  },

  /**
   * Update User
   *
   * @param {object} updatedUser
   * @param {function} callback
   */
  updateUser: function(updatedUser, callback) {
    if (typeof updatedUser === 'object') {
      var con = getDB();

      var userData = {
        FirstName: updatedUser.firstName,
        LastName: updatedUser.lastName,
        Email: updatedUser.email,
        Telephone: updatedUser.telephone
      };

      var address = updatedUser.address;
      var addressData = {
        Street: address.street,
        City: address.city,
        State: address.state,
        Zip: address.zip
      };

      var query = con.query(
        'START TRANSACTION;' +
        'UPDATE tblUser tblUser SET ? WHERE UserID = ?;' +
        'UPDATE tblAddress SET ? WHERE UserID = ?;' +
        'COMMIT;',
        [userData, updatedUser.userID, addressData, updatedUser.userID],
        function(error, result) {
          if (error) {
            console.log(error.message);
            callback(false);
          } else {
            console.log(result);
            callback(true);
          }
          con.end();
        }
      );
    } else {
      callback(false);
    }
  },

  /**
   * Get all Users in the DB
   *
   * @param {function} callback
   */
  getUsers: function(callback) {
    var con = getDB();

    var query = con.query(
      'SELECT u.UserID as userID,' +
      '       FirstName as firstName,' +
      '       LastName as lastName,' +
      '       Email as email,' +
      '       Telephone as telephone,' +
      '       Street as street,' +
      '       City as city,' +
      '       State as state,' +
      '       Zip as zip ' +
      'FROM tblUser u ' +
      'INNER JOIN tblAddress a on u.UserID = a.UserID;',
      function(error, result) {
        if (error) {
          console.log(error.message);
          callback([]);
        } else {
          var users = [];

          result.forEach(function(res) {
            users.push(transformUserResult(res));
          });
          callback(users);
        }
        con.end();
      }
    );
  },

  /**
   * Get user with id
   *
   * @param {number} id
   * @param {function} callback
   */
  getUser: function(id, callback) {
    var con = getDB();

    var query = con.query(
      'SELECT u.UserID as userID,' +
      '       FirstName as firstName,' +
      '       LastName as lastName,' +
      '       Email as email,' +
      '       Telephone as telephone,' +
      '       Street as street,' +
      '       City as city,' +
      '       State as state,' +
      '       Zip as zip ' +
      'FROM tblUser u ' +
      'INNER JOIN tblAddress a on u.UserID = a.UserID ' +
      'WHERE u.UserID = ?;',
      [id],
      function(error, result) {
        if (error) {
          console.log(error.message);
          callback({});
        } else {
          callback(result[0] ? transformUserResult(result[0]) : {});
        }
        con.end();
      }
    );
  },

  /**
   * Delete user with id
   *
   * @param {number} id
   * @param {function} callback
   */
  deleteUser: function(id, callback) {
    var con = getDB();

    var query = con.query(
      'DELETE FROM tblUser ' +
      'WHERE UserID = ?;',
      [id],
      function(error, result) {
        if (error) {
          console.log(error.message);
          callback(false);
        } else {
          console.log('delete', result);
          callback(result[0] ? transformUserResult(result[0]) : {});
        }
        con.end();
      }
    );
  }
};

module.exports = DB;