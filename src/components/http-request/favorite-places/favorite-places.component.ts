import { Component, inject, Injector, OnDestroy, runInInjectionContext } from '@angular/core';
import { Place } from '../place-model';
import { Subscription } from 'rxjs';
import { PlacesService } from 'host/PlacesService';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { ErrorService } from '../../../shared/modal-error/service/error.service';

@Component({
  selector: 'app-favorite-places',
  templateUrl: './favorite-places.component.html',
  styleUrls: ['./favorite-places.component.scss']
})
export class FavoritePlacesComponent implements OnDestroy {
  favoritePlaces: Place[] = [];
  isFetching = false;
  localError = '';
  isTesting = false;

  private subscription!: Subscription;
  private placesService!: InstanceType<typeof PlacesService>;

  constructor(private injector: Injector, private errorService: ErrorService) {}

  async ngOnInit() {
    if (this.isTesting) return; // avoids the async logic on the test

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

      this.favoritePlaces = this.placesService.loadedUserPlaces$.subscribe({
        next: (places: Place[]) => {this.favoritePlaces = places},
      })

      this.placesService.loadUserPlaces().subscribe({
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

  onRemovePlace(selectedPlace: Place) {
    const sub = this.placesService.removeUserPlace(selectedPlace).subscribe({
      error: (error: Error) => {
        console.error(error.message);
        this.errorService.showError('Problem removing place, please try again.')
      }
    });
  }
}
