import { Component, Input } from '@angular/core';
import { ModalComponent } from "../modal/modal.component";
import { ErrorService } from '../error.service';

@Component({
    selector: 'app-error-modal',
    templateUrl: './error-modal.component.html',
    styleUrls: ['./error-modal.component.scss'],
})
export class ErrorModalComponent {
  @Input() title = '';
  @Input() message = '';

  constructor(private errorService: ErrorService) {}

  onClearError() {this.errorService.clearError()};
}
