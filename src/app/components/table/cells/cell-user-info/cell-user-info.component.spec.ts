import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellUserInfoComponent } from './cell-user-info.component';

describe('CellUserInfoComponent', () => {
  let component: CellUserInfoComponent;
  let fixture: ComponentFixture<CellUserInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellUserInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CellUserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
