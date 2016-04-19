/*
 * Component encapsulating the user create behavior of the application
 *
 * Seth Cohen <seth.h.cohen@gmail.com>
 */
define([
  '../../services/user.service',
  '../../services/user_mysql.service',
  '../../services/storage_selector.service',
  '../../models/user'
], function(userService, userMySQLService, storageSelector, User) {
  var UserCreateComponent = ng.core.Component({
    selector: 'user-create',
    template: `
        <div class="container">
          <form>
            <h3>User Details</h3>
            <h4 *ngIf="saveSuccessful">Congratulations {{savedUser}} was just saved</h4>
            <h4 *ngIf="saveFailed">Awe snap! Error saving {{user.firstName}}.</h4>
            <input type="submit" class="btn btn-default" (click)="onSubmit($event)" value="Create">
            <div class="form-group">
              <label for="first_name">First Name:</label>
              <input [(ngModel)]="user.firstName" name="first_name" type="text" class="form-control" required>
            </div>
            <div class="form-group">
              <label for="last_name">Last Name:</label>
              <input [(ngModel)]="user.lastName" name="last_name" type="text" class="form-control" required>
            </div>
            <div class="form-group">
              <label for="email">Email:</label>
              <input [(ngModel)]="user.email" name="email" type="email" class="form-control" required>
            </div>
            <div class="form-group">
              <label for="phone">Telephone:</label>
              <input [(ngModel)]="user.telephone" name="phone" type="text" class="form-control" required>
            </div>
            <h3>Address Details</h3>
            <div class="form-group">
              <label for="street">Street:</label>
              <input [(ngModel)]="user.address.street" name="street" type="text" class="form-control" required>
            </div>
            <div class="form-group">
              <label for="city">City:</label>
              <input [(ngModel)]="user.address.city" name="city" type="text" class="form-control" required>
            </div>
            <div class="form-group">
              <label for="state">State:</label>
              <input [(ngModel)]="user.address.state" name="state" type="text" class="form-control" required>
            </div>
            <div class="form-group">
              <label for="zip">Zip:</label>
              <input [(ngModel)]="user.address.zip" name="zip" type="text" class="form-control" required>
            </div>
          </form>
        </div>
      `,
    providers: [userService, userMySQLService]
  })
  .Class({
    constructor: [userService, userMySQLService, storageSelector, function(users, usersMySQL, selector) {
      this.selector = selector;
      this.userService = users;
      this.userMySQLService = usersMySQL;
      this.user = new User();
      this.savedUser = '';
      this.saveSuccessful = false;
      this.saveFailed = false;
    }],

    routerCanReuse: function() {
      return false;
    },

    /**
     * Handle click of the submit button - we should attempt to create a user if valid
     *
     * @param {object} e The event object
     */
    onSubmit: function(e) {
      if (this.user.isValid()) {
        var self = this;
        if (this.selector.useRemoteStorage) {
          this.userMySQLService.create(this.user).subscribe(
            function(res) {
              self.processSaveResponse(res);
            }
          );
        } else {
          var saveResult = false;
          if (this.userService.create(this.user)) {
            saveResult = true;
          }
          self.processSaveResponse(saveResult);
        }
      }
    },

    /**
     * Handle the response from the user service
     *
     * @param {object} createResponse Response from the user service
     */
    processSaveResponse: function(createResponse) {
      if (createResponse) {
        this.saveSuccessful = true;
        this.savedUser = this.user.firstName + ' ' + this.user.lastName;
        this.user.set({});
      } else {
        this.saveFailed = true;
      }
    }
  });

  return UserCreateComponent;
});