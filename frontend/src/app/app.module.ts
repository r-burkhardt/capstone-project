import { BrowserModule } from '@angular/platform-browser';
import {ApplicationRef, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import { ResolveAssetPathPipe } from './core/pipes/resolve-asset-path.pipe';

import { APP_RESOLVER_PROVIDERS } from './app.resolver';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    // ResolveAssetPathPipe,
  ],
  providers: [
    APP_PROVIDERS,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor( public appRef: ApplicationRef) {}
}
