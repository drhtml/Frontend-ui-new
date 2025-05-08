import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewInteriorDetailsComponent } from './review-interior-details.component';

describe('ReviewInteriorDetailsComponent', () => {
  let component: ReviewInteriorDetailsComponent;
  let fixture: ComponentFixture<ReviewInteriorDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewInteriorDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewInteriorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
