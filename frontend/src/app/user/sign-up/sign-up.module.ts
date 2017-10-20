import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SignupComponent} from './sign-up.component';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [ SignupComponent ],
  exports: [ SignupComponent ]
})
export class SignUpModule { }
