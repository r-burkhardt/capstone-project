import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgMiniDetailComponent } from './org-mini-detail.component';

describe('OrgMiniDetailComponent', () => {
  let component: OrgMiniDetailComponent;
  let fixture: ComponentFixture<OrgMiniDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgMiniDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgMiniDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
