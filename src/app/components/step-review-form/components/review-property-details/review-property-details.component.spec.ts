import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewPropertyDetailsComponent } from './review-property-details.component';

describe('ReviewPropertyDetailsComponent', () => {
  let component: ReviewPropertyDetailsComponent;
  let fixture: ComponentFixture<ReviewPropertyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewPropertyDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewPropertyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
