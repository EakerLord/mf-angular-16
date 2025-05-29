import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements AfterViewInit {
  @ViewChild('dialog', { static: false, read: ElementRef })
  private dialogEl!: ElementRef<HTMLDialogElement>;

  ngAfterViewInit(): void {this.dialogEl.nativeElement.showModal()};
}
