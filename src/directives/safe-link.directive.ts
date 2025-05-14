import { Directive, ElementRef, Input } from '@angular/core';
@Directive({
  selector: 'a[appSafeLink]',
  host: {
    '(click)': 'onConfirmLeavePage($event)'
  }
})
export class SafeLinkDirective { // Atribute self directive
  @Input('appSafeLink') routeParam: string = '';

  constructor(private hostElementRef: ElementRef<HTMLAnchorElement>) {}

  onConfirmLeavePage(event: MouseEvent) {
    const wantsToLeave = window.confirm('Do you want to leave the app?');

    if (wantsToLeave) {
      const address = this.hostElementRef.nativeElement.href;
      // const address = (event.target as HTMLAnchorElement).href;
      this.hostElementRef.nativeElement.href = address + this.routeParam;
      // (event.target as HTMLAnchorElement).href = address + this.routeParam();
      return;
    }

    event?.preventDefault();
  }
}
