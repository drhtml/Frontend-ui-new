import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricePointChartComponent } from './price-point-chart.component';

describe('PricePointChartComponent', () => {
  let component: PricePointChartComponent;
  let fixture: ComponentFixture<PricePointChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PricePointChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PricePointChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
