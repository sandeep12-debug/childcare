import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEducatorProfileComponent } from './update-educator-profile.component';

describe('UpdateEducatorProfileComponent', () => {
  let component: UpdateEducatorProfileComponent;
  let fixture: ComponentFixture<UpdateEducatorProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateEducatorProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEducatorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
