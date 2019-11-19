import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TrendPage } from './trend.page';

describe('TrendPage', () => {
  let component: TrendPage;
  let fixture: ComponentFixture<TrendPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TrendPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TrendPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
