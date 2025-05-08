import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellEvaluationStatusComponent } from './cell-evaluation-status.component';

describe('CellEvaluationStatusComponent', () => {
  let component: CellEvaluationStatusComponent;
  let fixture: ComponentFixture<CellEvaluationStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellEvaluationStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CellEvaluationStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
