import { Component, EventEmitter, Input, Output } from '@angular/core';
import { type Place } from '../place-model';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent {
  @Input({ required: true }) places: Place[] = [];
  @Output() selectPlace = new EventEmitter<Place>();

  onSelectPlace(place: Place) {
    this.selectPlace.emit(place);
  }

  trackById(index: number, place: Place): string {
    return place.id;
  }
}
