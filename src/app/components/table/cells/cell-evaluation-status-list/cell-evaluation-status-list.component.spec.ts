import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellEvaluationStatusListComponent } from './cell-evaluation-status-list.component';

describe('CellEvaluationStatusListComponent', () => {
  let component: CellEvaluationStatusListComponent;
  let fixture: ComponentFixture<CellEvaluationStatusListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellEvaluationStatusListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CellEvaluationStatusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
