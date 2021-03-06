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
  '../../services/user_mysql.service',
  '../../services/storage_selector.service',
  '../../models/user',
  '../modal/confirmation_modal.component'
], function(userService, userMySQLService, storageSelector, User, ConfirmModal) {
  var UserDeleteComponent = ng.core.Component({
    selector: 'user-delete',
    template: `
        <div class="container">
          <form>
            <h3>Delete User (Enter User ID)</h3>
            <h4 *ngIf="deleteSuccessful">You asked for it. {{deletedUser}} was just deleted</h4>
            <h4 *ngIf="deleteFailed">Awe snap! Error deleting {{user.firstName}}.</h4>
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
          <div *ngIf="!validUser() && userID" class="text-center">No User with id = {{userID}}</div>
        </div>
      `,
    providers: [userService, userMySQLService],
    directives: [ConfirmModal]
  })
  .Class({
    constructor: [userService, userMySQLService, storageSelector, function(users, usersMySQL, selector) {
      this.selector = selector;
      this.userService = users;
      this.userMySQLService = usersMySQL;
      this.userID = '';
      this.user = new User();
      this.deletedUser = '';
      this.deleteSuccessful = false;
      this.deleteFailed = false;

      // Confirm Modal inputs
      this.showModal = false;
      this.confirmTitle = 'Confirm Delete';
      this.confirmMessage = 'Are you sure you want to delete this user?';
    }],

    routerOnActivate: function(inst) {
      var userID = inst.params.userID;
      if (userID) {
        this.userID = userID;
        this.user.set(this.getUser(this.userID));
      }
    },

    routerOnDeactivate: function() {
      this.userID = 0;
      this.user.set({});
    },

    routerCanReuse: function() {
      return false;
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
      this.user.set(this.getUser(this.userID));
    },

    /**
     * Get the user from the appropriate storage
     *
     * @param {number} userID ID of the user to retrieve
     */
    getUser: function(userID) {
      if (userID) {
        this.userID = userID;
        if (this.selector.useRemoteStorage) {
          var self = this;
          this.userMySQLService.get(this.userID).subscribe(
            function(res) {
              self.user.set(res);
            }
          );
        } else {
          this.user.set(this.userService.get(this.userID));
        }
      }
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
        var self = this;
        if (this.selector.useRemoteStorage) {
          this.userMySQLService.delete(this.user.userID).subscribe(
            function(res) {
              self.processDeleteResponse(res);
            }
          );
        } else {
          var deleteResult = false;
          if (this.userService.delete(this.user.userID)) {
            deleteResult = true;
          }
          self.processDeleteResponse(deleteResult);
        }
        this.confirmMessage = 'Deleting ...';
      } else {
        this.showModal = false;
      }
    },

    /**
     * Handle the response from the user service
     *
     * @param {object} deleteResponse Response from the user service
     */
    processDeleteResponse: function(deleteResponse) {
      if (deleteResponse) {
        this.deleteSuccessful = true;
        this.deletedUser = this.user.firstName + ' ' + this.user.lastName;
        this.user.set({});
        this.userID = '';
      } else {
        this.deleteFailed = true;
      }
      this.showModal = false;
      this.confirmMessage = 'Are you sure you want to delete this user?';
    }
  });

  return UserDeleteComponent;
});