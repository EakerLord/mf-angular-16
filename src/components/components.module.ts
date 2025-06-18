import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";

import { HeaderComponent } from '../components/header/header.component';
import { LessonComponent } from '../components/lesson/lesson.component';
import { TasksComponent } from '../components/tasks/tasks.component';
import { CardComponent } from "../shared/card/card.component";
import { TaskComponent } from "../components/task/task.component";
import { NewTaskComponent } from "../components/new-task/new-task.component";
import { SimpleFormComponent } from './template-form/simple-form/simple-form.component';
import { NotFoundComponent } from "./not-found/not-found.component";
import { TasksContainerComponent } from './tasks/tasks-container/tasks-container.component';
import { NewRequestComponent } from './http-request/new-request/new-request.component';
import { AvailablePlacesComponent } from './http-request/available-places/available-places.component';
import { FavoritePlacesComponent } from './http-request/favorite-places/favorite-places.component';
import { PlacesComponent } from './http-request/places/places.component';
import { PlacesContainerComponent } from './http-request/places-container/places-container.component';
import { ErrorModalComponent } from "../shared/modal-error/components/error/error-modal.component";
import { ModalComponent } from "../shared/modal-error/components/modal/modal.component";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    HeaderComponent, LessonComponent, TasksComponent, CardComponent, TaskComponent, NewTaskComponent, SimpleFormComponent,
    NotFoundComponent, TasksContainerComponent, NewRequestComponent, AvailablePlacesComponent, FavoritePlacesComponent,
    PlacesComponent, PlacesContainerComponent, ErrorModalComponent, ModalComponent
  ],
  imports: [ SharedModule, TranslateModule ],
  exports: [
    HeaderComponent, LessonComponent, TasksComponent, CardComponent, TaskComponent, NewTaskComponent, NotFoundComponent,
    TasksContainerComponent, NewRequestComponent, AvailablePlacesComponent, FavoritePlacesComponent, PlacesComponent,
    PlacesContainerComponent, ErrorModalComponent
  ]
})
export class ComponentsModule {}
