import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlacesComponent } from './places.component';
import { By } from '@angular/platform-browser';

describe('PlacesComponent', () => {
  let component: PlacesComponent;
  let fixture: ComponentFixture<PlacesComponent>;

  const mockPlaces = [
    {
      id: '1',
      title: 'Place One',
      image: { src: 'img1.jpg', alt: 'Image One' },
      lat: 10.123,
      lon: 20.456
    },
    {
      id: '2',
      title: 'Place Two',
      image: { src: 'img2.jpg', alt: 'Image Two' },
      lat: -5.321,
      lon: 15.789
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlacesComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacesComponent);
    component = fixture.componentInstance;
    component.places = mockPlaces as any;
    fixture.detectChanges();
  });

  it('should create the places component', () => {
    expect(component).toBeTruthy();
  });

  it('should render a list item for each place', () => {
    const items = fixture.nativeElement.querySelectorAll('.places-list__item');
    expect(items.length).toBe(2);
  });

  it('should render place title and image correctly', () => {
    const images = fixture.nativeElement.querySelectorAll('.places-list__image');
    const titles = fixture.nativeElement.querySelectorAll('.places-list__title');
    expect(images[0].src).toContain('http://localhost:3000/img1.jpg');
    expect(images[0].alt).toBe('Image One');
    expect(titles[0].textContent).toContain('Place One');
    expect(images[1].src).toContain('http://localhost:3000/img2.jpg');
    expect(images[1].alt).toBe('Image Two');
    expect(titles[1].textContent).toContain('Place Two');
  });

  it('should emit selectPlace event when a place is clicked', () => {
    spyOn(component.selectPlace, 'emit');
    const buttons = fixture.debugElement.queryAll(By.css('.places-list__button'));
    buttons[0].nativeElement.click();
    expect(component.selectPlace.emit).toHaveBeenCalledWith(mockPlaces[0]);
    buttons[1].nativeElement.click();
    expect(component.selectPlace.emit).toHaveBeenCalledWith(mockPlaces[1]);
  });

  it('should use trackById for ngFor', () => {
    const place = mockPlaces[0];
    expect(component.trackById(0, place)).toBe(place.id);
  });
});
