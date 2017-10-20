import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModule } from './login/login.module';
import { SignUpModule } from './sign-up/sign-up.module';
import { BuildPlayerModule } from './build-player/build-player.module';
import {RouterModule} from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    LoginModule,
    SignUpModule,
    BuildPlayerModule
  ],
  declarations: [  ],
  exports: [
    LoginModule,
    SignUpModule,
    BuildPlayerModule
  ]
})

export class UserModule { }
