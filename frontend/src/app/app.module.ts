import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ResolveAssetPathPipe } from './core/pipes/resolve-asset-path.pipe';

// import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppRoutingModule } from './app.routing';
import { CoreModule } from './core/core.module';
import { TBadminModule } from './shared/tbadmin.module';
import { PagesModule } from './pages/pages.module';
import { UserModule } from './user/user.module';

// Application wide providers
// const APP_PROVIDERS = [
//   ...APP_RESOLVER_PROVIDERS,
// ];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    TBadminModule,
    PagesModule,
    UserModule
  ],
  providers: [
    // APP_PROVIDERS,
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor() {}
}
