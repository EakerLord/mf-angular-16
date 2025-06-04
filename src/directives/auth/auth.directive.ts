import { Directive, effect, inject, Injector, Input, runInInjectionContext, TemplateRef, ViewContainerRef } from '@angular/core';
import { TaskService } from '../../services/tasks/tasks.service';

@Directive({
  selector: '[appAuth]',
})
export class AuthDirective { // Estructural self directive
  // @Input('appAuth') renderCondition!: string;
  @Input() appAuth!: string;
  /* Due to the structure of the structural directive, aliases cannot be used within the input; instead, the variable must be used as is,
     as the name of the directive.
  */
  private injector = inject(Injector);


  constructor(private tasksService: TaskService, private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef) {
    this.tasksService.taskAuthentication(true); // Simple auth method
  }

  ngOnInit(): void {
    runInInjectionContext(this.injector, () => {
      effect(() => {
        if (this.tasksService.activePermission === this.appAuth) {
          this.viewContainerRef.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainerRef.clear();
        }
      });
    });
  }
}


