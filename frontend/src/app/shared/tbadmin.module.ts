import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutModule } from './layout/layout.module';
import {ErrorsModule} from './errors/errors.module';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    ErrorsModule
  ],
  declarations: [],
  exports: [
    LayoutModule,
    ErrorsModule
  ]
})
export class TBadminModule { }
