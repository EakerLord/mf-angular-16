import { Directive, effect, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { TaskService } from '../services/tasks.service';

@Directive({
  selector: '[appAuth]',
})
export class AuthDirective { // Estructural self directive
  // @Input('appAuth') renderCondition!: string;
  @Input() appAuth!: string;
  /* Due to the structure of the structural directive, aliases cannot be used within the input; instead, the variable must be used as is,
     as the name of the directive.
  */

  constructor(private tasksService: TaskService, private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef) {
    this.tasksService.taskAuthentication(true); // Simple auth method

    effect(() => {
      if (this.tasksService.activePermission === this.appAuth) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainerRef.clear();
      }
    });
  }
}
