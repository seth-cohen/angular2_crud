/*
 * Seth Cohen <seth.h.cohen@gmail.com>
 */

/*
 * Component encapsulating the user delete behavior of the application
 *
 * Seth Cohen <seth.h.cohen@gmail.com>
 */
define([
  '../../services/user.service',
  '../../models/user',
  '../modal/confirmation_modal.component'
], function(userService, User, ConfirmModal) {
  var UserDeleteComponent = ng.core.Component({
    selector: 'user-delete',
    template: `
        <div [class.hidden]="!isVisible" class="container">
          <form>
            <h3>Delete User (Enter User ID)</h3>
            <h4 *ngIf="deleteSuccessful">You asked for it. {{deletedUser}} was just deleted</h4>
            <div class="form-group">
              <label for="user_id">User ID</label>
              <input [(ngModel)]="userID" name="user_id" type="number" 
                     class="form-control" (change)="onChange($event)" (keyup)="onChange($event)" min="0" required>
            </div>
            <input type="submit" class="btn btn-default" (click)="openModal($event)" value="Delete"/>
          </form>
          <confirm-modal 
            [showModal]="showModal" 
            [confirmTitle]="confirmTitle" 
            [confirmMessage]="confirmMessage" 
            (closeModal)="closeModal($event)" 
            (confirmed)="onModalConfirm($event)">
          </confirm-modal>
          <div *ngIf="validUser()">
            <div><span class="col-xs-3 text-right">Name:</span><span class="col-xs-9">{{user.firstName}} {{user.lastName}}</span></div>
            <div><span class="col-xs-3 text-right">Email:</span><span class="col-xs-9">{{user.email}}</span></div>
            <div><span class="col-xs-3 text-right">Telephone:</span><span class="col-xs-9">{{user.telephone}}</span></div>
            <div>
              <span class="col-xs-3 text-right">Address:</span> 
              <span class="col-xs-9">{{user.address.street}} {{user.address.city}}, {{user.address.state}} {{user.address.zip}}</span>
            </div>
              
          </div>
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
      this.deletedUser = '';
      this.deleteSuccessful = false;

      // Confirm Modal inputs
      this.showModal = false;
      this.confirmTitle = 'Confirm Delete';
      this.confirmMessage = 'Are you sure you want to delete this user?';
    }],
    ngOnChanges: function(changes) {
      // If we changed the visibility we should wipe out the
      if (typeof changes.isVisible === 'object' &&  changes.isVisible.currentValue === true) {
        this.deleteSuccessful = false;
      }
    },

    /**
     * Do we actually have a valid user to display
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
      this.deleteSuccessful = false;
      this.deletedUser = '';
      if (this.user.userID) {
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
        if (this.userService.delete(this.user.userID)) {
          this.deleteSuccessful = true;
          this.deletedUser = this.user.firstName + ' ' + this.user.lastName;
          this.user.set({});
          this.userID = '';
        }
      }
      this.showModal = false;
    }
  });

  return UserDeleteComponent;
});