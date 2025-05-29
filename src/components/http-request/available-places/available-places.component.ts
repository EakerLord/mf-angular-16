import { Component, inject, Injector, OnDestroy, runInInjectionContext } from '@angular/core';
import { Place } from '../place-model';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { PlacesService } from 'host/PlacesService';
import { Subscription } from 'rxjs';
import { ErrorService } from '../../../shared/modal-error/error.service';
@Component({
  selector: 'app-available-places',
  templateUrl: './available-places.component.html',
  styleUrls: ['./available-places.component.scss']
})
export class AvailablePlacesComponent implements OnDestroy {
  userPlaces: Place[] = [];
  isFetching = false;
  localError = '';

  private subscription!: Subscription;
  private placesService!: InstanceType<typeof PlacesService>;

  constructor(private injector: Injector, private errorService: ErrorService) { }

  async ngOnInit() {
    this.isFetching = true;
    try {
      const hostServiceModule = await loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4200/remoteEntry.js',
        exposedModule: './PlacesService',
      });

      const PlacesServiceClass = hostServiceModule.PlacesService;
      // (A >= 15) -> "inject" is available.
      runInInjectionContext(this.injector, () => {this.placesService = inject(PlacesServiceClass)});

      this.placesService.loadAvailablePlaces().subscribe({
        next: (places: Place[]) => this.userPlaces = places,
        error: (error: Error) => { this.localError = error.message },
        complete: () => this.isFetching = false
      });
    } catch (error) {
      this.localError = 'The remote service could not be loaded.';
      this.isFetching = false;
    }
  }

  ngOnDestroy() {
    if (this.subscription) {this.subscription.unsubscribe()};
  }

  onSelectPlace(selectedPlace: Place) {
    const sub = this.placesService.addPlaceToUserPlaces(selectedPlace).subscribe({
      error: (error: Error) => {
        console.error(error.message);
        this.errorService.showError('Problem adding place, please try again.')
      }
    });
  }
}
