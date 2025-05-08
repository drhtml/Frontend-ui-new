import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardBottomStatisticComponent } from './dashboard-bottom-statistic.component';

describe('DashboardBottomStatisticComponent', () => {
  let component: DashboardBottomStatisticComponent;
  let fixture: ComponentFixture<DashboardBottomStatisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardBottomStatisticComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardBottomStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
