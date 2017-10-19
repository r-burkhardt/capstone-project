import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Organization} from '../../../core/services/organization.service';

@Component({
  selector: 'app-org-search',
  templateUrl: './org-search.component.html',
  styleUrls: ['./org-search.component.css']
})
export class OrgSearchComponent implements OnInit {

  searchResults: Organization[];
  @Output() selectedOrg = new EventEmitter<Organization>();

  constructor() { }

  ngOnInit() {
  }

}
