import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanCardEditComponent } from './plan-card-edit.component';

describe('PlanCardEditComponent', () => {
  let component: PlanCardEditComponent;
  let fixture: ComponentFixture<PlanCardEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanCardEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanCardEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
