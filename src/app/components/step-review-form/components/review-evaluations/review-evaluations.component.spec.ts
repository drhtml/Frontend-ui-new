import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewEvaluationsComponent } from './review-evaluations.component';

describe('ReviewEvaluationsComponent', () => {
  let component: ReviewEvaluationsComponent;
  let fixture: ComponentFixture<ReviewEvaluationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewEvaluationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewEvaluationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
