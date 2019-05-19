import {Component, OnDestroy, OnInit} from '@angular/core';
import {Organization, OrganizationService} from '../../../core/services/organization.service';

import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ZipcodeService } from '../../../core/services/zipcode.service';

@Component({
  selector: 'app-org-profile',
  templateUrl: './org-profile.component.html',
  styleUrls: ['./org-profile.component.css']
})
export class OrgProfileComponent implements OnInit, OnDestroy {
  unsubscribe: Subject<void> = new Subject<void>();

  org: Organization;


  constructor(
    private organizationService: OrganizationService,
    private zipcodeService: ZipcodeService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getOrg(params['id']);
    });
  }

  ngOnDestroy() {
    // Prevent memory leak
    // See https://stackoverflow.com/questions/38008334/angular-rxjs-when-should-i-unsubscribe-from-subscription
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  getOrg(id: string) {
    this.organizationService.getOrganization(id)
      // .takeUntil(this.unsubscribe)
      .subscribe(organization => {
        this.org = organization;
        this.zipcodeService.getZipcode(this.org.zipcode)
          // .takeUntil(this.unsubscribe)
          .subscribe(zipcode => {
            this.org.zipcodeObj = zipcode;
          });
      });
  }

}
