import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationsProfileComponent } from './org-profile.component';

describe('OrganizationsProfileComponent', () => {
  let component: OrganizationsProfileComponent;
  let fixture: ComponentFixture<OrganizationsProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationsProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationsProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
