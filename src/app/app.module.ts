import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { path: '', component: AppComponent },
];

@NgModule({
  declarations: [ AppComponent ],
  imports: [ SharedModule, ComponentsModule, RouterModule.forChild(routes) ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
