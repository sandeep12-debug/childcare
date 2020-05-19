import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducatorComponent } from './educator.component';

describe('EducatorComponent', () => {
  let component: EducatorComponent;
  let fixture: ComponentFixture<EducatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
