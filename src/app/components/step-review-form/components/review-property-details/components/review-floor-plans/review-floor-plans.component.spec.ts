import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewFloorPlansComponent } from './review-floor-plans.component';

describe('ReviewFloorPlansComponent', () => {
  let component: ReviewFloorPlansComponent;
  let fixture: ComponentFixture<ReviewFloorPlansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewFloorPlansComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewFloorPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
