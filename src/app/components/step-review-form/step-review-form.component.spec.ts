import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepReviewFormComponent } from './step-review-form.component';

describe('StepReviewFormComponent', () => {
  let component: StepReviewFormComponent;
  let fixture: ComponentFixture<StepReviewFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepReviewFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepReviewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
