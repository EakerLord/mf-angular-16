import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.scss']
})
export class NewRequestComponent {
  @Output() close = new EventEmitter<void>();

  onCancel() { this.close.emit() };
}
