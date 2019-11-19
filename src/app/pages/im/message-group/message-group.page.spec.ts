import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageGroupPage } from './message-group.page';

describe('MessageGroupPage', () => {
  let component: MessageGroupPage;
  let fixture: ComponentFixture<MessageGroupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageGroupPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageGroupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
