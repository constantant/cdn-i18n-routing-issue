import { NgModule } from '@angular/core';
import { APP_BASE_HREF, Location, LocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { FixedLocation } from '../utils/fixed-location';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([{ path: '', loadChildren: () => import('../page/page.module').then(m => m.PageModule) }])
  ],
  providers: [
    ...(environment.production ? [
      {
        provide: Location,
        useClass: FixedLocation
      },
      {
        provide: APP_BASE_HREF,
        useFactory: () => {
          const [, root, locale] = location.pathname.split('/');
          return `//${ location.host }/${ root }/${ locale }/`
        }
      }
    ] : [])
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private readonly locationStrategy: LocationStrategy) {
    console.log('baseHref', locationStrategy.getBaseHref());
  }
}
