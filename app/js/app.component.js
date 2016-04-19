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
  'services/storage_selector.service',
  'underscore'
], function(UserCreateComponent, UserListComponent, UserDeleteComponent, UserUpdateComponent, storageSelector, _) {
  var useRemoteStorage = false;
  var AppComponent = ng.core.Component({
    selector: 'care-app',
    template: `
        <div class="col-xs-12">
          <h1>User CRUD SPA Example</h1>
          <div class="well well-sm">
            <a class="btn btn-default btn-sm" (click)="toggleStorage()">switch</a>
            <span *ngIf="useRemoteStorage">Using Remote Storage: <br /> 
              Ensure MySQL is running on server and you created the schema provided in a DB called cyber. 
            </span>
            <span *ngIf="!useRemoteStorage">Using localStorage</span>
          </div>
          <div class="btn-group-horizontal">
            <input type="button" class="btn btn-default btn-lg" value="Create" (click)="showCreate()" />
            <input type="button" class="btn btn-default btn-lg" value="List" (click)="showList()"/>
            <input type="button" class="btn btn-default btn-lg" value="Delete" (click)="showDelete()" />
            <input type="button" class="btn btn-default btn-lg" value="Update" (click)="showUpdate()" />
          </div>
          <router-outlet></router-outlet>
        </div>
      `,
    providers: [ng.router.ROUTER_PROVIDERS, storageSelector],
    directives: [UserCreateComponent, UserListComponent, UserDeleteComponent, UserUpdateComponent, ng.router.ROUTER_DIRECTIVES]
  })
  .Class({
    constructor: [ng.router.Router, storageSelector, function(router, selector) {
      window.router = this.router = router;
      this.selector = selector;
      this.useRemoteStorage = this.selector.useRemoteStorage;
    }],
    
    showCreate: function() {
      this.router.navigate(['Create']);
    },
    showList: function() {
      this.router.navigate(['List']);
    },
    showDelete: function() {
      this.router.navigate(['Delete']);
    },
    showUpdate: function() {
      this.router.navigate(['Update']);
    },
    toggleStorage: function() {
      this.useRemoteStorage = this.selector.toggleStorage();
      this.router.navigateByInstruction(this.router.currentInstruction);
    }
  });

  AppComponent = ng.router.RouteConfig([
    {path: '/create', name: 'Create', component: UserCreateComponent},
    {path: '/list', name: 'List', component: UserListComponent, useAsDefault: true},
    {path: '/update', name: 'Update', component: UserUpdateComponent},
    {path: '/update/:userID', name: 'UpdateUser', component: UserUpdateComponent},
    {path: '/delete', name: 'Delete', component: UserDeleteComponent},
    {path: '/delete/:userID', name: 'DeleteUser', component: UserDeleteComponent}
  ])(AppComponent);

  // Let's bootstrap the application
  return ng.platform.browser.bootstrap(AppComponent, [ng.router.ROUTER_PROVIDERS, ng.http.HTTP_PROVIDERS, storageSelector]);
});