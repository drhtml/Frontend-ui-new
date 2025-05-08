import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellActionsComponent } from './cell-actions.component';

describe('CellActionsComponent', () => {
  let component: CellActionsComponent;
  let fixture: ComponentFixture<CellActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellActionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CellActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
