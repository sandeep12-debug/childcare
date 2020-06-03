import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservetionPrintComponent } from './observetion-print.component';

describe('ObservetionPrintComponent', () => {
  let component: ObservetionPrintComponent;
  let fixture: ComponentFixture<ObservetionPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservetionPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservetionPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
