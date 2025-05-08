import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopCitiesPieChartComponent } from './top-cities-pie-chart.component';

describe('TopCitiesPieChartComponent', () => {
  let component: TopCitiesPieChartComponent;
  let fixture: ComponentFixture<TopCitiesPieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopCitiesPieChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopCitiesPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
