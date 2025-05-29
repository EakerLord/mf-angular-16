import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-places-container',
  templateUrl: './places-container.component.html',
  styleUrls: ['./places-container.component.scss']
})
export class PlacesContainerComponent {
  @Input({ required: true }) title = '';
}
