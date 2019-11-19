import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferRecordPage } from './transfer-record.page';

describe('TransferRecordPage', () => {
  let component: TransferRecordPage;
  let fixture: ComponentFixture<TransferRecordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferRecordPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferRecordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
