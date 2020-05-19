import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapEducatorComponent } from './map-educator.component';

describe('MapEducatorComponent', () => {
  let component: MapEducatorComponent;
  let fixture: ComponentFixture<MapEducatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapEducatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapEducatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
