import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import { ResolveAssetPathPipe } from './core/pipes/resolve-asset-path.pipe';

import { APP_RESOLVER_PROVIDERS } from './app.resolver';
// import { PlayerComponent } from './player/player.component';
import { CoreModule } from './core/core.module';
// import { LoginComponent } from './shared/login/login.component';
// import { SignupComponent } from './shared/create-user/create-user.component';
// import { ProfileComponent } from './shared/create-profile/create-profile.component';
import { TBadminModule } from './shared/tbadmin.module';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
];

@NgModule({
  declarations: [
    AppComponent,
    // PlayerComponent,
    // LoginComponent,
    // SignupComponent,
    // ProfileComponent,
  ],
  imports: [
    BrowserModule,
    // MenuModule,
    CoreModule,
    TBadminModule,
  ],
  providers: [
    APP_PROVIDERS,
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor() {}
}
