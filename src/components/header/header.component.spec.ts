import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the header component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the logo with correct src and alt', () => {
    const logo: HTMLImageElement = fixture.nativeElement.querySelector('.legacy-header__logo');
    expect(logo).toBeTruthy();
    expect(logo.src).toContain('assets/mf-angular-16/task-management-logo.png');
    expect(logo.alt).toBe('A list of lessons in Angular 16 and less');
  });

  it('should render the correct title', () => {
    const title: HTMLElement = fixture.nativeElement.querySelector('.legacy-header__title');
    expect(title).toBeTruthy();
    expect(title.textContent).toContain('Knowledge of Angular 16 and less');
  });

  it('should render the correct description', () => {
    const description: HTMLElement = fixture.nativeElement.querySelector('.legacy-header__description');
    expect(description).toBeTruthy();
    expect(description.textContent).toContain('Senior-level knowledge with the Angular framework and versions 16 and less');
  });
});
