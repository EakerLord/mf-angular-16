import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from '../components/header/header.component';
import { LessonComponent } from '../components/lesson/lesson.component';
import { TasksComponent } from '../components/tasks/tasks.component';
import { CardComponent } from "../shared/card/card.component";
import { TaskComponent } from "../components/task/task.component";
import { NewTaskComponent } from "../components/new-task/new-task.component";

const routes: Routes = [
  { path: '', component: AppComponent },
];

@NgModule({
  declarations: [ AppComponent, HeaderComponent, LessonComponent, TasksComponent, CardComponent, TaskComponent, NewTaskComponent ],
  imports: [ CommonModule, FormsModule, RouterModule.forChild(routes) ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
