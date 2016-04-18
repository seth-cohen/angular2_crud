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
  '../../models/user',
  '../../models/address',
  'underscore'
], function(userService, User, Address, _) {

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
        <div [class.hidden]="!isVisible">
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
              <td colspan="4">No Users - Why Not Create Some</td>
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
                <span class="col-xs-3">Address:</span> 
                <span class="col-xs-6">{{user.address.street}} {{user.address.city}}, {{user.address.state}} {{user.address.zip}}</span>
              </td>
            </tr>
          </tbody>
          </table>
        </div>
      `,
    inputs: ['isVisible'],
    providers: [userService]
  })
  .Class({
    constructor: [userService, function(users) {
      this.userService = users;
      this.users = [];
      this.hasUsers = false;
      this.isVisible = false;
    }],
    ngOnInit: function() {
      this.setUsers(this.userService.getAll());
    },
    ngOnChanges: function(changes) {
      // If we changed the visibility we should reload the users fromt the service
      if (typeof changes.isVisible === 'object' &&  changes.isVisible.currentValue === true) {
        this.setUsers(this.userService.getAll());
      }
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