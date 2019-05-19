import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Organization, OrganizationService} from '../../../core/services/organization.service';
import { ZipcodeService } from '../../../core/services/zipcode.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-org-search',
  templateUrl: './org-search.component.html',
  styleUrls: ['./org-search.component.css']
})
export class OrgSearchComponent implements OnInit {
  unsubscribe: Subject<void> = new Subject<void>();

  searchResults: Organization[];
  @Output() selectedOrg = new EventEmitter<Organization>();
  @Output() selected = new EventEmitter();

  constructor(
    private organizationService: OrganizationService,
    private zipcodeService: ZipcodeService
  ) {
    // this.searchResults = new Array<Organization>();
  }

  ngOnInit() {
    // this.createSearchResults();
  }

  createSearchResults() {
    const orgParameters = {};
    this.organizationService.getAllOrganizations(orgParameters)
      // .takeUntil(this.unsubscribe)
      .subscribe(organizations => {
        this.searchResults = organizations;
        this.searchResults.forEach( org => {
          this.zipcodeService.getZipcode(org.zipcode)
            // .takeUntil(this.unsubscribe)
            .subscribe(zip => {
              org.zipcodeObj = zip;
            });
        });
      });

    // let org1: Organization = new Organization();
    // org1.id = "111111aaaaaa";
    // org1.name = "San Francisco Gay Basketball Association";
    // org1.street = "100 Collingwood St";
    // org1.zipcode = "94114";
    // org1.latitude = "37.75";
    // org1.longitude = "-122.43";
    // org1.website = "http://www.sfgba.com";
    // org1.email = "justin@sfgba.com";
    // org1.phone = "";
    // org1.contact = "Justin Seiter";
    // org1.logo = "sfgba.jpg";
    // tslint:disable-next-line:max-line-length
    // org1.about = "The San Francisco Gay Basketball Association has seen hundreds of players pass through its doors over the last 30 years — highly skilled and less skilled; men and women; every race and creed; gay, straight and transgender. Diversity and inclusion has been one of our program’s hallmarks. Throughout this history, though, there has been one amazing constant for whom we are most thankful — our founder and perennial leader Tony Jasinski.<br /> Since launching our program in 1986, he has battled with city officials to get us established, developed great relationships with many of those same officials, navigated us through multiple gym locations, showed great care during loss in our community, ran our league for almost nine years and taken great pride in helping make San Francisco Gay Basketball the longest running and most successful Gay hoops program in the world. He is our rock. He is not one of the elite players, as he is the first to admit, so his participation is not a matter of ego. He has been dedicated to helping develop and support younger and less-skilled players and building our community — often digging into his own pockets to do so.<br /> Tony has been a great supporter of Gay basketball around the world, often helping advise programs in their infancy. His remarkable contributions to this sport were recognized when he was elected as an inaugural member of the Chicago Hoops Classic Hall of Fame in 2000. He has also helped support the Gay Games movement by serving for a number of years as a Treasurer and Board Member of Team San Francisco and as a Delegate to the international Federation of Gay Games.";
    //
    // let org2: Organization = new Organization();
    // org2.id = "111111aaaaab";
    // org2.name = "San Jose Basketball Group";
    // org2.street = "5155 Cherry Ave";
    // org2.zipcode = "95118";
    // org2.latitude = "37.25";
    // org2.longitude = "-121.88";
    // org2.website = "http://www.sjbg.org";
    // org2.email = "jzapper@sjbg.org";
    // org2.phone = "";
    // org2.contact = "John Zapper";
    // org2.logo = "";
    // org2.about = "";
    //
    // this.searchResults.push(org1);
    // this.searchResults.push(org2);
  }

  onSelect(organization: Organization) {
    this.selectedOrg.emit(organization);
    this.selected.emit();
  }

}
