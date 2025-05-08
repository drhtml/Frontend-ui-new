import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageVisitLineChartComponent } from './average-visit-line-chart.component';

describe('AverageVisitLineChartComponent', () => {
  let component: AverageVisitLineChartComponent;
  let fixture: ComponentFixture<AverageVisitLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AverageVisitLineChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AverageVisitLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
