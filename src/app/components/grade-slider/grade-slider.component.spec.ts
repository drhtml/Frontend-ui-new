import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeSliderComponent } from './grade-slider.component';

describe('GradeSliderComponent', () => {
  let component: GradeSliderComponent;
  let fixture: ComponentFixture<GradeSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradeSliderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradeSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
