import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Organization, OrganizationService} from '../../core/services/organization.service';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.css']
})
export class OrganizationsComponent implements OnInit {
  unsubscribe: Subject<void> = new Subject<void>();

  selectedOrg: Organization;
  @Output() passOrg = new EventEmitter<Organization>();

  allOrgs: Organization[];
  oneOrg: Organization;

  constructor( private organizationService: OrganizationService ) { }

  ngOnInit() {

    // const orgParameters = {};
    // this.organizationService.getAllOrganizations(orgParameters)
    //   .takeUntil(this.unsubscribe)
    //   .subscribe(organizations => {
    //     this.allOrgs = organizations;
    //     // console.log(players);
    //   });
    // const orgId = '59c2f4ad2bd8512053c4e112';
    // this.organizationService.getOrganization(orgId)
    //   .takeUntil(this.unsubscribe)
    //   .subscribe(org => {
    //     this.oneOrg = org;
    //   });

  }

  selectedOrgUpdate(organization: Organization) {
    this.selectedOrg = organization;
  }

  passOnOrg() {
    this.passOrg.emit(this.selectedOrg);
  }

}
