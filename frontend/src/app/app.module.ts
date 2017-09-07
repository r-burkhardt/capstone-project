import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LayoutModule } from "./shared/layout/layout.module";
import { ResolveAssetPathPipe } from './core/pipes/resolve-asset-path.pipe';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    LayoutModule,
    // ResolveAssetPathPipe,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
