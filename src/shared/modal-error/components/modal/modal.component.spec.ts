import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';
import { Component } from '@angular/core';

@Component({
  template: `
    <app-modal>
      <span class="test-modal-content">Modal Content</span>
    </app-modal>
  `
})
class TestHostComponent {}

describe('ModalComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalComponent, TestHostComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
  });

  it('should create the modal component', () => {
    fixture.detectChanges();
    const modalDebugElement = fixture.debugElement.nativeElement.querySelector('app-modal');
    expect(modalDebugElement).toBeTruthy();
  });

  it('should call showModal on the dialog element after view init', () => {
    const modalComponent: ModalComponent = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();

    const dialog: HTMLDialogElement = fixture.nativeElement.querySelector('dialog');
    spyOn(dialog, 'showModal');

    modalComponent['dialogEl'] = { nativeElement: dialog } as any;
    modalComponent.ngAfterViewInit();

    expect(dialog.showModal).toHaveBeenCalled();
  });

  it('should render projected content inside the dialog', () => {
    fixture.detectChanges();
    const dialog: HTMLElement = fixture.nativeElement.querySelector('dialog');
    expect(dialog.textContent).toContain('Modal Content');
    const projected = dialog.querySelector('.test-modal-content');
    expect(projected).not.toBeNull();
  });
});
