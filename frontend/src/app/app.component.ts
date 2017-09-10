import { Component, ViewChild } from '@angular/core';
import { HeaderComponent } from './shared/layout/header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild(HeaderComponent) header;
  title = 'Team Builder';

  constructor() {}
}
