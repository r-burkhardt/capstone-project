import { Component, OnInit } from '@angular/core';
import {Organization} from '../../core/services/organization.service';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.css']
})
export class OrganizationsComponent implements OnInit {

  testOrg: Organization;

  constructor() {
    this.testOrg = new Organization();
  }

  ngOnInit() {
  }

}
