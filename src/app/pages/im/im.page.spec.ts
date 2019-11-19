import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImPage } from './im.page';

describe('ImPage', () => {
  let component: ImPage;
  let fixture: ComponentFixture<ImPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
