import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellActionsBottomComponent } from './cell-actions-bottom.component';

describe('CellActionsBottomComponent', () => {
  let component: CellActionsBottomComponent;
  let fixture: ComponentFixture<CellActionsBottomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellActionsBottomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CellActionsBottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
