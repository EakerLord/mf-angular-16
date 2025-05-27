import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from "./app.routes";

import { AppComponent } from './app.component';
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [ AppComponent ],
  imports: [ SharedModule, ComponentsModule, RouterModule.forChild(routes) ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
