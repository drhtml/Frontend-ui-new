import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricePointsSummaryDialogComponent } from './price-points-summary-dialog.component';

describe('PricePointsSummaryDialogComponent', () => {
  let component: PricePointsSummaryDialogComponent;
  let fixture: ComponentFixture<PricePointsSummaryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PricePointsSummaryDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PricePointsSummaryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
