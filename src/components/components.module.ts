import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";

import { HeaderComponent } from '../components/header/header.component';
import { LessonComponent } from '../components/lesson/lesson.component';
import { TasksComponent } from '../components/tasks/tasks.component';
import { CardComponent } from "../shared/card/card.component";
import { TaskComponent } from "../components/task/task.component";
import { NewTaskComponent } from "../components/new-task/new-task.component";
import { SimpleFormComponent } from './template-form/simple-form/simple-form.component';

@NgModule({
  declarations: [ HeaderComponent, LessonComponent, TasksComponent, CardComponent, TaskComponent, NewTaskComponent, SimpleFormComponent ],
  imports: [ SharedModule ],
  exports: [ HeaderComponent, LessonComponent, TasksComponent, CardComponent, TaskComponent, NewTaskComponent ]
})
export class ComponentsModule {}
