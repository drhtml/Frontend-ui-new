import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewPropertyHeaderComponent } from './review-property-header.component';

describe('ReviewPropertyHeaderComponent', () => {
  let component: ReviewPropertyHeaderComponent;
  let fixture: ComponentFixture<ReviewPropertyHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewPropertyHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewPropertyHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
