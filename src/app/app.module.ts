import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { routes } from "./app.routes";
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { RemoteA16Interceptor } from '../interceptors/remote-a16-interceptor/remote-a16.interceptor';
/*(A <= 14) -> For Angular 15 and more use the "inject" approach.
import { APP_INITIALIZER, Injector } from '@angular/core';
import { loadPlacesService } from './remote-providers';
*/

export function HttpLoaderFactory(http: HttpClient) {return new TranslateHttpLoader(http, '/assets/i18n/', '.json')}; // Factory function for AoT

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    SharedModule, ComponentsModule, RouterModule.forChild(routes),
    HttpClientModule, TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: RemoteA16Interceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

/*(A <= 14) -> Manually registers the remote module making the service available globally inside providers: [].
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
