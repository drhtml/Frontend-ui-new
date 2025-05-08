import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewSchoolsComponent } from './review-schools.component';

describe('ReviewSchoolsComponent', () => {
  let component: ReviewSchoolsComponent;
  let fixture: ComponentFixture<ReviewSchoolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewSchoolsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewSchoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
