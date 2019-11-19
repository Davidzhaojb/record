/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LotteryNumberComponent } from './lottery-number.component';

describe('LotteryNumberComponent', () => {
  let component: LotteryNumberComponent;
  let fixture: ComponentFixture<LotteryNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LotteryNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LotteryNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
