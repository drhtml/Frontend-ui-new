import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellEvaluationStatusCollapseComponent } from './cell-evaluation-status-collapse.component';

describe('CellEvaluationStatusCollapseComponent', () => {
  let component: CellEvaluationStatusCollapseComponent;
  let fixture: ComponentFixture<CellEvaluationStatusCollapseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellEvaluationStatusCollapseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CellEvaluationStatusCollapseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
