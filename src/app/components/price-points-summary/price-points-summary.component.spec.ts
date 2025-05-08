import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricePointsSummaryComponent } from './price-points-summary.component';

describe('PricePointsSummaryComponent', () => {
  let component: PricePointsSummaryComponent;
  let fixture: ComponentFixture<PricePointsSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PricePointsSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PricePointsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
