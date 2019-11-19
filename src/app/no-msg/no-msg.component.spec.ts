import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoMsgComponent } from './no-msg.component';

describe('NoMsgComponent', () => {
  let component: NoMsgComponent;
  let fixture: ComponentFixture<NoMsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoMsgComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
