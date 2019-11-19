/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LotteryChooesComponent } from './lottery-chooes.component';

describe('LotteryChooesComponent', () => {
  let component: LotteryChooesComponent;
  let fixture: ComponentFixture<LotteryChooesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LotteryChooesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LotteryChooesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
