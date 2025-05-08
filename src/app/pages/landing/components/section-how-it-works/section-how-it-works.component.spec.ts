import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionHowItWorksComponent } from './section-how-it-works.component';

describe('SectionHowItWorksComponent', () => {
  let component: SectionHowItWorksComponent;
  let fixture: ComponentFixture<SectionHowItWorksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionHowItWorksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionHowItWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
