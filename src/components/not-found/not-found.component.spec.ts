import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotFoundComponent } from './not-found.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotFoundComponent],
      imports: [RouterTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the not-found component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title', () => {
    const title = fixture.nativeElement.querySelector('.not-found__title');
    expect(title).toBeTruthy();
    expect(title.textContent).toContain('Sorry! Page not found');
  });

  it('should render the description', () => {
    const description = fixture.nativeElement.querySelector('.not-found__description');
    expect(description).toBeTruthy();
    expect(description.textContent).toContain('The URL you requested could not be found.');
  });

  it('should have a link to the main page', () => {
    const link = fixture.nativeElement.querySelector('.not-found__back-link');
    expect(link).toBeTruthy();
    expect(link.getAttribute('ng-reflect-router-link') || link.getAttribute('href')).toContain('/a19');
    expect(link.textContent).toContain('Back to main page');
  });
});
