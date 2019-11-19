import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainsPage } from './domains.page';

describe('DomainsPage', () => {
  let component: DomainsPage;
  let fixture: ComponentFixture<DomainsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomainsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomainsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
