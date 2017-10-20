// import './lib'

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { apiConfig } from './app/core/api.config';
import { environment } from './environments/environment';
import { AppModule } from './app/app.module';

// tslint:disable-next-line:prefer-const
// tslint:disable-next-line:no-var-keyword
// tslint:disable-next-line:prefer-const
// var fs = require('fs');

if (environment.name.toLowerCase() === 'local') {
  // Local server connecting to api
  apiConfig.restApiUrl = environment.restApiUrl;
} else if (environment.name.toLowerCase() === '104.198.193.53') {
  // Production
  enableProdMode();
}

// if (environment.production) {
//   enableProdMode();
// }

platformBrowserDynamic().bootstrapModule(AppModule);
