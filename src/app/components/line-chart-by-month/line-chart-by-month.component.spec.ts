import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineChartByMonthComponent } from './line-chart-by-month.component';

describe('LineChartByMonthComponent', () => {
  let component: LineChartByMonthComponent;
  let fixture: ComponentFixture<LineChartByMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineChartByMonthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LineChartByMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
