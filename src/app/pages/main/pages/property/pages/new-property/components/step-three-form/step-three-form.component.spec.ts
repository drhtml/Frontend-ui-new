import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepThreeFormComponent } from './step-three-form.component';

describe('StepThreeFormComponent', () => {
  let component: StepThreeFormComponent;
  let fixture: ComponentFixture<StepThreeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepThreeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepThreeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
