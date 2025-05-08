import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewPriceEvolutionComponent } from './review-price-evolution.component';

describe('ReviewPriceEvolutionComponent', () => {
  let component: ReviewPriceEvolutionComponent;
  let fixture: ComponentFixture<ReviewPriceEvolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewPriceEvolutionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewPriceEvolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
