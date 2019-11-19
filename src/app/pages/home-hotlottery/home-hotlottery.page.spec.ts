import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeHotlotteryPage } from './home-hotlottery.page';

describe('HomeHotlotteryPage', () => {
  let component: HomeHotlotteryPage;
  let fixture: ComponentFixture<HomeHotlotteryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeHotlotteryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeHotlotteryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
