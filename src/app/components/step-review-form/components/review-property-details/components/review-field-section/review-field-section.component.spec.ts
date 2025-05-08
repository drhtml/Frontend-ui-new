import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewFieldSectionComponent } from './review-field-section.component';

describe('ReviewFieldSectionComponent', () => {
  let component: ReviewFieldSectionComponent;
  let fixture: ComponentFixture<ReviewFieldSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewFieldSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewFieldSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
