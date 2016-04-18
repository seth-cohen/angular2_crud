/*
 * Component encapsulating the user create behavior of the application
 *
 * Seth Cohen <seth.h.cohen@gmail.com>
 */
define([
  '../../services/user.service',
  '../../models/user'
], function(userService, User) {
  var UserCreateComponent = ng.core.Component({
    selector: 'user-create',
    template: `
        <div [class.hidden]="!isVisible" class="container">
          <form>
            <h3>User Details</h3>
            <h4 *ngIf="saveSuccessful">Congratulations {{savedUser}} was just saved</h4>
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
              <input [(ngModel)]="user.address.zip" name="state" type="text" class="form-control" required>
            </div>
            <button type="submit" class="btn btn-default" (click)="onSubmit($event)">Submit</button>
          </form>
        </div>
      `,
    inputs: ['isVisible'],
    providers: [userService]
  })
  .Class({
    constructor: [userService, function(users) {
      this.userService = users;
      this.user = new User();
      this.isVisible = false;
      this.savedUser = '';
      this.saveSuccessful = false;
    }],
    ngOnChanges: function(changes) {
      // If we changed the visibility we should wipe out the
      if (typeof changes.isVisible === 'object' &&  changes.isVisible.currentValue === true) {
        this.saveSuccessful = false;

      }
    },

    /**
     * Handle click of the submit button - we should attempt to create a user if valid
     *
     * @param {object} e The event object
     */
    onSubmit: function(e) {
      e.preventDefault();
      if (this.user.isValid()) {
        if (this.userService.create(this.user)) {
          this.saveSuccessful = true;
          this.savedUser = this.user.firstName + ' ' + this.user.lastName;;
          this.user.set({});
        }
      }
    }
  });

  return UserCreateComponent;
});