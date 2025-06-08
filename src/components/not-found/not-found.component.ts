import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements AfterViewInit {
  @ViewChild('mainContent') mainContent!: ElementRef<HTMLElement>;

  ngAfterViewInit() {
    this.mainContent.nativeElement.focus();
  }
}
