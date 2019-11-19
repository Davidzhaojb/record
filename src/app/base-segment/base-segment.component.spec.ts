import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseSegmentComponent } from './base-segment.component';

describe('BaseSegmentComponent', () => {
  let component: BaseSegmentComponent;
  let fixture: ComponentFixture<BaseSegmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseSegmentComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseSegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
