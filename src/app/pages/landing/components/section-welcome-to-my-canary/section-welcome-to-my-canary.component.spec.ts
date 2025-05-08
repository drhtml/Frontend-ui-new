import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionWelcomeToMyCanaryComponent } from './section-welcome-to-my-canary.component';

describe('SectionWelcomeToMyCanaryComponent', () => {
  let component: SectionWelcomeToMyCanaryComponent;
  let fixture: ComponentFixture<SectionWelcomeToMyCanaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionWelcomeToMyCanaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionWelcomeToMyCanaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
