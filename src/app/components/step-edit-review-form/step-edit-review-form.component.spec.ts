import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepEditReviewFormComponent } from './step-edit-review-form.component';

describe('StepEditReviewFormComponent', () => {
  let component: StepEditReviewFormComponent;
  let fixture: ComponentFixture<StepEditReviewFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepEditReviewFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepEditReviewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
