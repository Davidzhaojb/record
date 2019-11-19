import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendDetailPage } from './trend-detail.page';

describe('TrendDetailPage', () => {
  let component: TrendDetailPage;
  let fixture: ComponentFixture<TrendDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrendDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
