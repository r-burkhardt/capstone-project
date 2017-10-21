import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email;
  password;

  errorMessage;

  private eStore = 'tim@test.com';
  private pStore = '123456';

  constructor( private router: Router) { }

  ngOnInit() {
  }

  onLogin() {
    if (this.authorize(this.email, this.password)) {
      // this.errorMessage = 'Welcome back';
      this.router.navigate(['/']);
      return;
    }

    this.errorMessage = 'invalid credentials';
    // this.router.navigate(['./'])


  }

  authorize(email: string, password: string): boolean {
    if (email === this.eStore && password === this.pStore) {
      return true;
    }
    return false;
  }

}
