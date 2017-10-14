import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PagesComponent],
  exports: [ PagesComponent ]
})
export class PagesModule { }
