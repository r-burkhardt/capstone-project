import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgInfoDetailComponent } from './org-info-detail.component';

describe('OrgInfoDetailComponent', () => {
  let component: OrgInfoDetailComponent;
  let fixture: ComponentFixture<OrgInfoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgInfoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgInfoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
