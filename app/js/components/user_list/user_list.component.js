/*
 * Seth Cohen <seth.h.cohen@gmail.com>
 */

/*
 * Component encapsulating the user list behavior of the application
 *
 * Seth Cohen <seth.h.cohen@gmail.com>
 */
define([
  '../../services/user.service',
  '../../services/user_mysql.service',
  '../../services/storage_selector.service',
  '../../models/user',
  '../../models/address',
  'underscore'
], function(userService, userMySQLService, storageSelector, User, Address, _) {

  var UserListComponent = ng.core.Component({
    selector: 'user-list',
    styles: [`
      .table thead {
        background: darkorchid;
        color: white;
      }
      .table tbody:nth-child(odd){
        background: antiquewhite;  
      }
    `],
    template: `
        <div class="container">
          <h3>All Users</h3>
          <table class="table table-condensed table-bordered">
          <thead>
            <tr>
              <th class="col-xs-1">ID</th>
              <th class="col-xs-4">Name</th>
              <th class="col-xs-4">Email</th>
              <th class="col-xs-3">Telephone</th>
            </tr>
          </thead>
          <tbody *ngIf="!users.length">
            <tr>
              <td colspan="4">No Users - Why Not <a [routerLink]="['Create']">Create</a> Some</td>
            </tr>
          </tbody>
          <tbody *ngFor="#user of users">
            <tr>
              <td>{{user.userID}}</td>
              <td>{{user.firstName}} {{user.lastName}}</td>
              <td>{{user.email}}</td>
              <td>{{user.telephone}}</td>
            </tr>
            <tr>
              <td colspan="4" *ngIf="user.address"> 
                <span class="col-xs-2">Address:</span> 
                <span class="col-xs-7">{{user.address.street}} {{user.address.city}}, {{user.address.state}} {{user.address.zip}}</span>
                <a class="btn btn-warning" [routerLink]="['UpdateUser', {userID: user.userID }]">update</a>
                <a class="btn btn-danger" [routerLink]="['DeleteUser', {userID: user.userID }]">delete</a>
              </td>
            </tr>
          </tbody>
          </table>
        </div>
      `,
    providers: [userService, userMySQLService],
    directives: [ng.router.ROUTER_DIRECTIVES]
  })
  .Class({
    constructor: [userService, userMySQLService, storageSelector, function(users, usersMySQL, selector) {
      this.selector = selector;
      this.userService = users;
      this.userMySQLService = usersMySQL;
      this.users = [];
      this.hasUsers = false;
    }],
    ngOnInit: function() {
      if (this.selector.useRemoteStorage) {
        var self = this;
        this.userMySQLService.getAll().subscribe(
          function(res) {
            self.setUsers(res);
          }
        );
      } else {
        this.setUsers(this.userService.getAll());
      }
    },

    routerCanReuse: function() {
      return false;
    },

    /**
     * Sets an array of users
     *
     * @param {Array} userData Array of users to set on the class
     */
    setUsers: function(userData) {
      if (userData instanceof Array) {
        var self = this;
        this.users = [];
        _.each(userData, function(data) {
          self.users.push(new User(data));
        });
      }
    }
  });

  return UserListComponent;
});