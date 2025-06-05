import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { routes } from "./app.routes";
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RemoteA16Interceptor } from '../interceptors/remote-a16-interceptor/remote-a16.interceptor';
/*(A <= 14) -> For Angular 15 and more use the "inject" approach.
import { APP_INITIALIZER, Injector } from '@angular/core';
import { loadPlacesService } from './remote-providers';
*/
@NgModule({
  declarations: [ AppComponent ],
  imports: [ SharedModule, ComponentsModule, RouterModule.forChild(routes) ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: RemoteA16Interceptor, multi: true}
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
