import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricePointsSummaryRightComponent } from './price-points-summary-right.component';

describe('PricePointsSummaryRightComponent', () => {
  let component: PricePointsSummaryRightComponent;
  let fixture: ComponentFixture<PricePointsSummaryRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PricePointsSummaryRightComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PricePointsSummaryRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
