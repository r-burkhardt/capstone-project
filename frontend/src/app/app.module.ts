import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import { ResolveAssetPathPipe } from './core/pipes/resolve-asset-path.pipe';

import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { HeaderModule } from './shared/layout/header/header.module';
import { PlayerComponent } from './player/player.component';
import { CoreModule } from "./core/core.module";
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
];

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    HeaderModule,
    CoreModule,
  ],
  providers: [
    APP_PROVIDERS,
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor() {}
}
