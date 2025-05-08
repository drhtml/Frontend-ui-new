import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyEvaluationDialogComponent } from './property-evaluation-dialog.component';

describe('PropertyEvaluationDialogComponent', () => {
  let component: PropertyEvaluationDialogComponent;
  let fixture: ComponentFixture<PropertyEvaluationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyEvaluationDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyEvaluationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
