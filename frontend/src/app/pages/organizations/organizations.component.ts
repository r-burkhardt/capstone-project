import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Organization} from '../../core/services/organization.service';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.css']
})
export class OrganizationsComponent implements OnInit {

  selectedOrg: Organization;
  @Output() passOrg = new EventEmitter<Organization>();

  constructor() { }

  ngOnInit() {
  }

  selectedOrgUpdate(organization: Organization) {
    this.selectedOrg = organization;
  }

  passOnOrg() {
    this.passOrg.emit(this.selectedOrg);
  }

}
