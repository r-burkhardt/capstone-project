import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import { ResolveAssetPathPipe } from './core/pipes/resolve-asset-path.pipe';

import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { CoreModule } from './core/core.module';
import { TBadminModule } from './shared/tbadmin.module';
import { PagesModule } from './pages/pages.module';
import { AppRoutingModule } from './app.routing';

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
    CoreModule,
    TBadminModule,
    PagesModule,
    AppRoutingModule
  ],
  providers: [
    APP_PROVIDERS,
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor() {}
}
