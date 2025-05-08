import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanSettingsComponent } from './plan-settings.component';

describe('PlanSettingsComponent', () => {
  let component: PlanSettingsComponent;
  let fixture: ComponentFixture<PlanSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
