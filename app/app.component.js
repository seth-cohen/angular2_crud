define([], function() {
  var Address = 
    ng.core.Class({
      constructor: function(street, city, state, zip) {
        this.street = street || '';
        this.city = city || '';
        this.state = state || '';
        this.zip = zip || '';
      }
    });

  var User = 
    ng.core.Class({
      constructor: function(street, city, state, zip) {
        this.street = street || '';
        this.city = city || '';
        this.state = state || '';
        this.zip = zip || '';
      }
    });

  app.CreateUserComponent = 
    ng.core.Component({ 
      selector: 'user-create',
      template: 'Lovie'
    })
    .Class({
      constructor: function() {},
    });

  app.UserListComponent = 
    ng.core.Component({
      selector: 'user-list',
      template: `
        <div [class.hidden]="!isVisible">
          <table class="table table-condensed table-bordered">
          <thead>
            <tr>
              <th class="col-xs-3">Name</th>
              <th class="col-xs-3">Email</th>
              <th class="col-xs-3">Telephone</th>
            </tr>
          </thead>
          <tbody *ngFor="#user of users">
            <tr>
              <td>{{user.firstName}} {{user.lastName}}</td>
              <td>{{user.email}}</td>
              <td>{{user.telephone}}</td>
            </tr>
            <tr>
              <td colspan="3"> <span class="col-xs-3">Address:</span> {{user.address.street}}</td>
            </tr>
          </tbody>
          </table>
        </div>
      `,
      inputs: ['isVisible']
    })
    .Class({
      constructor: function() {
        this.users = [
          {firstName: 'Alice', lastName: 'Smith', email: 'test1@test.com', telephone: '555-555-1212', address: new Address('385 Wylie School Rd', 'Voluntown', 'CT', 06384)}, 
          {firstName: 'Bob', lastName: 'Johns', email: 'test2@test.com', telephone: '555-555-1212', address: new Address('385 Wylie School Rd', 'Voluntown', 'CT', 06384)},
          {firstName: 'Jeremy', lastName: 'Martin', email: 'test3@test.com', telephone: '555-555-1212', address: new Address('385 Wylie School Rd', 'Voluntown', 'CT', 06384)}
        ];
        this.isVisible = false;
      },
      ngOnChanges: function(changes) { 
        console.log(changes);
      }
    });

  app.AppComponent =
    ng.core.Component({
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
      directives: [app.CreateUserComponent, app.UserListComponent]
    })
    .Class({
      constructor: function() {},
      showCreate: function() {
        this.isCreateVisible = true;
      },
      showList: function() {
        console.log('showList');
        this.isListVisible = true;
      },
      showDelete: function() {
        this.isDeleteVisible = true;
      },
      showUpdate: function() {
        this.isUpdateVisible = true;
      }
    });
});