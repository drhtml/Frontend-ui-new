import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReviewPropertyDetailsComponent } from './edit-review-property-details.component';

describe('EditReviewPropertyDetailsComponent', () => {
  let component: EditReviewPropertyDetailsComponent;
  let fixture: ComponentFixture<EditReviewPropertyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditReviewPropertyDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditReviewPropertyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
