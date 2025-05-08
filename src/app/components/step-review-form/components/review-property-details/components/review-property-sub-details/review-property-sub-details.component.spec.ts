import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewPropertySubDetailsComponent } from './review-property-sub-details.component';

describe('ReviewPropertySubDetailsComponent', () => {
  let component: ReviewPropertySubDetailsComponent;
  let fixture: ComponentFixture<ReviewPropertySubDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewPropertySubDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewPropertySubDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
