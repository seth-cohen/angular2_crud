/*
 * Seth Cohen <seth.h.cohen@gmail.com>
 */

/*
 * Component for a reusable confirmation modal
 *
 * Seth Cohen <seth.h.cohen@gmail.com>
 */
define([], function() {
  var ConfirmationComponent = ng.core.Component({
    selector: 'confirm-modal',
    styles: [`
      #myModal {
        width: 400px;
        height: 50px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -25px;
        margin-left: -200px;
        padding: 20px;
        z-index: 2000;
      }
    `],
    template: `
        <div [class.modal]="!showModal" id="myModal" role="dialog">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <input type="button" class="close" (click)="onClose($event)" value="&times;"/>
                <h4 class="modal-title">{{title}}</h4>
              </div>
              <div class="modal-body">
                <p>{{message}}</p>
              </div>
              <div class="modal-footer">
                <div class="btn-group-horizontal">
                  <input type="button" class="btn btn-default" (click)="onOK()" value="OK"/>
                  <input type="button" class="btn btn-default" (click)="onCancel()" value="Cancel"/>
                </div>
              </div>
            </div>
        
          </div>
        </div>
      `,
    inputs: ['showModal', 'title: confirmTitle', 'message: confirmMessage'],
    events: ['confirmed', 'closeModal']
  })
  .Class({
    constructor: function() {
      this.showModal = false;
      this.title = 'Confirm';
      this.message = 'Are you sure?';
      this.confirmed = new ng.core.EventEmitter();
      this.closeModal = new ng.core.EventEmitter();
    },

    /**
     * Handle click of the close element
     *
     * @param {object} e The event object
     */
    onClose: function(e) {
      // Emit the output event
      this.closeModal.next(true);
    },

    /**
     * Handle click of the OK button
     *
     * @param {object} e The event object
     */
    onOK: function(e) {
      // Emit the output event to update the parent component
      this.confirmed.next(true);
    },

    /**
     * Handle click of the cancel button
     *
     * @param {object} e The event object
     */
    onCancel: function(e) {
      // Emit the output event to update the parent component
      this.confirmed.next(false);
    }
  });

  return ConfirmationComponent;
});
