import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEducatorComponent } from './manage-educator.component';

describe('ManageEducatorComponent', () => {
  let component: ManageEducatorComponent;
  let fixture: ComponentFixture<ManageEducatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageEducatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageEducatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
