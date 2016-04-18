/*
 * Component encapsulating the main application
 *
 * Seth Cohen <seth.h.cohen@gmail.com>
 */
define([
  'components/user_create/user_create.component',
  'components/user_list/user_list.component',
  'components/user_delete/user_delete.component',
  'components/user_update/user_update.component',
  'underscore'
], function(UserCreateComponent, UserListComponent, UserDeleteComponent, UserUpdateComponent, _) {

  var AppComponent = ng.core.Component({
    selector: 'care-app',
    template: `
        <div class="col-xs-12">
          <h1>CyberCare User CRUD Example</h1>
          <div class="btn-group-horizontal">
            <input type="button" class="btn btn-default btn-lg" value="Create" (click)="showCreate()" />
            <input type="button" class="btn btn-default btn-lg" value="List" (click)="showList()"/>
            <input type="button" class="btn btn-default btn-lg" value="Delete" (click)="showDelete()" />
            <input type="button" class="btn btn-default btn-lg" value="Update" (click)="showUpdate()" />
          </div>
          <user-create [isVisible]="isCreateVisible"></user-create>
          <user-list [isVisible]="isListVisible"></user-list>
          <user-delete [isVisible]="isDeleteVisible"></user-delete>
          <user-update [isVisible]="isUpdateVisible"></user-update>
        </div>
      `,
    directives: [UserCreateComponent, UserListComponent, UserDeleteComponent, UserUpdateComponent]
  })
  .Class({
    constructor: function() {
      this.setVisible(false);
    },
    showCreate: function() {
      this.setVisible(this.CREATE_VIEW);
    },
    showList: function() {
      console.log('showList');
      this.setVisible(this.LIST_VIEW);
    },
    showDelete: function() {
      this.setVisible(this.DELETE_VIEW);
    },
    showUpdate: function() {
      this.setVisible(this.UPDATE_VIEW);
    },
    ngOnChanges: function(changes) {
      console.log(changes);
    },
    setVisible: function(visibleView) {
      this.isCreateVisible = visibleView === this.CREATE_VIEW;
      this.isListVisible = visibleView === this.LIST_VIEW;
      this.isDeleteVisible = visibleView === this.DELETE_VIEW;
      this.isUpdateVisible = visibleView === this.UPDATE_VIEW;
    }
  });

  // Child Component constants
  AppComponent.prototype.CREATE_VIEW = 1;
  AppComponent.prototype.LIST_VIEW = 2;
  AppComponent.prototype.DELETE_VIEW = 3;
  AppComponent.prototype.UPDATE_VIEW = 4;

  return ng.platform.browser.bootstrap(AppComponent);
});