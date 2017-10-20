import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorPageModule } from './error-page/error-page.module';
import { PageNotFoundModule } from './page-not-found/page-not-found.module';

@NgModule({
  imports: [
    CommonModule,
    ErrorPageModule,
    PageNotFoundModule
  ],
  declarations: [],
  exports: [
    ErrorPageModule,
    PageNotFoundModule
  ]
})

export class ErrorsModule { }
