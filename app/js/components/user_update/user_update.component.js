/*
 * Seth Cohen <seth.h.cohen@gmail.com>
 */
define([
  '../../services/user.service',
  '../../models/user',
  '../modal/confirmation_modal.component'
], function(userService, User, ConfirmModal) {
  var UserDeleteComponent = ng.core.Component({
    selector: 'user-update',
    template: `
        <div [class.hidden]="!isVisible" class="container">
          <form>
            <h3>Update User (Enter User ID)</h3>
            <h4 *ngIf="updateSuccessful">You asked for it. {{updatedUser}} was just updated</h4>
            <div class="form-group">
              <label for="user_id">User ID</label>
              <input [(ngModel)]="userID" name="user_id" type="number" 
                     class="form-control" (change)="onChange($event)" (keyup)="onChange($event)" min="0" required>
            </div>
            <input type="submit" class="btn btn-default" (click)="openModal($event)" value="Update"/>
            <div *ngIf="validUser()">
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
            </div>
          </form>
          <confirm-modal 
            [showModal]="showModal" 
            [confirmTitle]="confirmTitle" 
            [confirmMessage]="confirmMessage" 
            (closeModal)="closeModal($event)" 
            (confirmed)="onModalConfirm($event)">
          </confirm-modal>
        </div>
      `,
    inputs: ['isVisible'],
    providers: [userService],
    directives: [ConfirmModal]
  })
  .Class({
    constructor: [userService, function(users) {
      this.userService = users;
      this.userID = '';
      this.user = new User();
      this.isVisible = false;
      this.updatedUser = '';
      this.updateSuccessful = false;

      // Confirm Modal inputs
      this.showModal = false;
      this.confirmTitle = 'Confirm Update';
      this.confirmMessage = 'Are you sure you want to update this user?';
    }],
    ngOnChanges: function(changes) {
      // If we changed the visibility we should wipe out the
      if (typeof changes.isVisible === 'object' &&  changes.isVisible.currentValue === true) {
        this.updateSuccessful = false;
      }
    },

    /**
     * Do we actually have a valid user to update
     *
     * @returns {boolean}
     */
    validUser: function() {
      return !!this.user.userID;
    },

    /**
     * Handle change event of the input
     *
     * @param {object} e The event object
     */
    onChange: function(e) {
      this.user.set(this.userService.get(this.userID));
    },

    /**
     * Open the delete confirmation modal
     *
     * @param {object} e
     */
    openModal: function(e) {
      this.updateSuccessful = false;
      this.updatedUser = '';
      if (this.user.userID && this.user.isValid()) {
        this.showModal = true;
      }
    },

    /**
     * Close the delete confirmation modal
     *
     * @param e
     */
    closeModal: function(e) {
      this.showModal = false;
    },

    /**
     * Handle the response from the confirmation modal
     *
     * @param e
     */
    onModalConfirm: function(e) {
      if (e === true) {
        if (this.userService.update(this.user)) {
          this.updateSuccessful = true;
          this.updatedUser = this.user.firstName + ' ' + this.user.lastName;
          this.user.set({});
          this.userID = '';
        }
      }
      this.showModal = false;
    }
  });

  return UserDeleteComponent;
});