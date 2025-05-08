import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewRecentTickerComponent } from './review-recent-ticker.component';

describe('ReviewRecentTickerComponent', () => {
  let component: ReviewRecentTickerComponent;
  let fixture: ComponentFixture<ReviewRecentTickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewRecentTickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewRecentTickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
