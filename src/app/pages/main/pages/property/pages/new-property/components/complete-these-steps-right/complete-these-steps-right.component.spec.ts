import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteTheseStepsRightComponent } from './complete-these-steps-right.component';

describe('CompleteTheseStepsRightComponent', () => {
  let component: CompleteTheseStepsRightComponent;
  let fixture: ComponentFixture<CompleteTheseStepsRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteTheseStepsRightComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompleteTheseStepsRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
