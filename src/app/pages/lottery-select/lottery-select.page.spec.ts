import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LotterySelectPage } from './lottery-select.page';

describe('LotterySelectPage', () => {
  let component: LotterySelectPage;
  let fixture: ComponentFixture<LotterySelectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LotterySelectPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LotterySelectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
