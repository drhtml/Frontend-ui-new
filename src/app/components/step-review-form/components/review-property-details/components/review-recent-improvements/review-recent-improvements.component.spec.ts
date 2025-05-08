import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewRecentImprovementsComponent } from './review-recent-improvements.component';

describe('ReviewRecentImprovementsComponent', () => {
  let component: ReviewRecentImprovementsComponent;
  let fixture: ComponentFixture<ReviewRecentImprovementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewRecentImprovementsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewRecentImprovementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
