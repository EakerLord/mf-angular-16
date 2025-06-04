import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoritePlacesComponent } from './favorite-places.component';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ErrorService } from '../../../shared/modal-error/service/error.service';
import { Injector } from '@angular/core';
import { of, throwError } from 'rxjs';

@Component({ selector: 'app-places-container', template: '<ng-content></ng-content>' })
class MockPlacesContainerComponent {
  @Input() title: string = '';
}
@Component({ selector: 'app-places', template: '' })
class MockPlacesComponent {
  @Input() places: any[] = [];
  @Output() selectPlace = new EventEmitter<any>();
}
class MockErrorService {
  showError = jasmine.createSpy('showError');
}
class MockPlacesService {
  loadedUserPlaces$ = of([{ id: '1', title: 'Place', image: { src: 'img.jpg', alt: 'alt' } }]);
  loadUserPlaces = jasmine.createSpy().and.returnValue(of([]));
  removeUserPlace = jasmine.createSpy().and.returnValue(of({}));
}
const mockLoadRemoteModule = jasmine.createSpy().and.callFake(async () => ({
  PlacesService: MockPlacesService
}));

describe('FavoritePlacesComponent', () => {
  let component: FavoritePlacesComponent;
  let fixture: ComponentFixture<FavoritePlacesComponent>;
  let errorService: MockErrorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavoritePlacesComponent, MockPlacesContainerComponent, MockPlacesComponent],
      providers: [
        { provide: ErrorService, useClass: MockErrorService },
        { provide: Injector, useValue: {} }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    (window as any).loadRemoteModule = mockLoadRemoteModule;
    (FavoritePlacesComponent.prototype as any).constructor.prototype.loadRemoteModule = mockLoadRemoteModule;

    fixture = TestBed.createComponent(FavoritePlacesComponent);
    component = fixture.componentInstance;
    component.isTesting = true;
    errorService = TestBed.inject(ErrorService) as any;
  });

  it('should create the favorite places component', () => {
    expect(component).toBeTruthy();
  });

  it('should show loading message when isFetching is true and no error', () => {
    component.isFetching = true;
    component.localError = '';
    fixture.detectChanges();

    const loadingMsg = fixture.nativeElement.querySelector('.places-list__fallback');
    expect(loadingMsg.textContent).toContain('Loading your favorite places');
  });

  it('should show error message when localError is set', () => {
    component.localError = 'Some error';
    component.isFetching = false;
    fixture.detectChanges();

    const errorMsg = fixture.nativeElement.querySelector('.places-list__fallback');
    expect(errorMsg.textContent).toContain('Some error');
  });
  it('should call removeUserPlace and show error on error', () => {
    // Mock the service and error
    const mockPlacesService = {
      removeUserPlace: jasmine.createSpy().and.returnValue(throwError(() => new Error('Remove error')))
    };
    component['placesService'] = mockPlacesService as any;

    component.onRemovePlace({ id: '1', title: 'Place', image: { src: 'img.jpg', alt: 'alt' }, lat: 0, lon: 0 });
    expect(mockPlacesService.removeUserPlace).toHaveBeenCalled();
    expect(errorService.showError).toHaveBeenCalledWith('Problem removing place, please try again.');
  });

  it('should show fallback when favoritePlaces is empty and not fetching/error', () => {
    component.isTesting = true;
    component.isFetching = false;
    component.localError = '';
    component.favoritePlaces = [];
    fixture.detectChanges();

    const fallback = fixture.nativeElement.querySelector('.places-list__fallback');
    expect(fallback.textContent).toContain('no places could be found');
  });

  it('should show app-places when favoritePlaces has places and not fetching/error', () => {
    component.isTesting = true;
    component.isFetching = false;
    component.localError = '';
    component.favoritePlaces = [{ id: '1', title: 'Place', image: { src: 'img.jpg', alt: 'alt' }, lat: 0, lon: 0 }];
    fixture.detectChanges();

    const placesComp = fixture.nativeElement.querySelector('app-places');
    expect(placesComp).toBeTruthy();
  });
});
