import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewEnergyDetailsComponent } from './review-energy-details.component';

describe('ReviewEnergyDetailsComponent', () => {
  let component: ReviewEnergyDetailsComponent;
  let fixture: ComponentFixture<ReviewEnergyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewEnergyDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewEnergyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
