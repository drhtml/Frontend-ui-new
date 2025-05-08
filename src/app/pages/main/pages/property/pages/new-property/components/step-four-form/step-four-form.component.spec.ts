import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepFourFormComponent } from './step-four-form.component';

describe('StepFourFormComponent', () => {
  let component: StepFourFormComponent;
  let fixture: ComponentFixture<StepFourFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepFourFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepFourFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
