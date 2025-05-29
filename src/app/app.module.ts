import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { routes } from "./app.routes";
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared/shared.module';
// This aproach is available for versions Angular 14 and less, for Angular 15 and more use the "inject" approach.
import { APP_INITIALIZER, Injector } from '@angular/core';
import { loadPlacesService } from './remote-providers';
@NgModule({
  declarations: [ AppComponent ],
  imports: [ SharedModule, ComponentsModule, RouterModule.forChild(routes) ],
  providers: [
    /*(A <= 14) -> Manually registers the remote module making the service available globally.
    {
      provide: APP_INITIALIZER,
      useFactory: (injector: Injector) => {
        return async () => {
          const PlacesServiceClass = await loadPlacesService();
          injector.get(PlacesServiceClass);
        };
      },
      deps: [Injector],
      multi: true
    }*/
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
