import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationSliderComponent } from './evaluation-slider.component';

describe('EvaluationSliderComponent', () => {
  let component: EvaluationSliderComponent;
  let fixture: ComponentFixture<EvaluationSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluationSliderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluationSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
