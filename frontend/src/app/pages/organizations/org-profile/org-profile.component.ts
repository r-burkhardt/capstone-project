import {Component, Input, OnInit} from '@angular/core';
import {Organization} from '../../../core/services/organization.service';

@Component({
  selector: 'app-org-profile',
  templateUrl: './org-profile.component.html',
  styleUrls: ['./org-profile.component.css']
})
export class OrgProfileComponent implements OnInit {

  testOrg: Organization;

  constructor() {

    // this.testOrg = new Organization();
    // this.testOrg.id = "123523412rdsf";
    // this.testOrg.name = "San Francisco Gay Basketball Association";
    // this.testOrg.street = "100 Collingwood St";
    // this.testOrg.zipcode = "94114";
    // this.testOrg.latitude = "37.75";
    // this.testOrg.longitude = "-122.43";
    // this.testOrg.website = "http://www.sfgba.com";
    // this.testOrg.email = "justin@sfgba.com";
    // this.testOrg.phone = "";
    // this.testOrg.contact = "Justin Seiter";
    // this.testOrg.about = "The San Francisco Gay Basketball Association has seen hundreds of players pass through its doors over the last 30 years — highly skilled and less skilled; men and women; every race and creed; gay, straight and transgender. Diversity and inclusion has been one of our program’s hallmarks. Throughout this history, though, there has been one amazing constant for whom we are most thankful — our founder and perennial leader Tony Jasinski.<br /> Since launching our program in 1986, he has battled with city officials to get us established, developed great relationships with many of those same officials, navigated us through multiple gym locations, showed great care during loss in our community, ran our league for almost nine years and taken great pride in helping make San Francisco Gay Basketball the longest running and most successful Gay hoops program in the world. He is our rock. He is not one of the elite players, as he is the first to admit, so his participation is not a matter of ego. He has been dedicated to helping develop and support younger and less-skilled players and building our community — often digging into his own pockets to do so.<br /> Tony has been a great supporter of Gay basketball around the world, often helping advise programs in their infancy. His remarkable contributions to this sport were recognized when he was elected as an inaugural member of the Chicago Hoops Classic Hall of Fame in 2000. He has also helped support the Gay Games movement by serving for a number of years as a Treasurer and Board Member of Team San Francisco and as a Delegate to the international Federation of Gay Games.";

  }

  ngOnInit() {
    // this.route.params.subscribe(params => {
      // this.getOrg(params['id']);
    // });
  }

}
