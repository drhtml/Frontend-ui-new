import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionWhyUseMyCanaryComponent } from './section-why-use-my-canary.component';

describe('SectionWhyUseMyCanaryComponent', () => {
  let component: SectionWhyUseMyCanaryComponent;
  let fixture: ComponentFixture<SectionWhyUseMyCanaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionWhyUseMyCanaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionWhyUseMyCanaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
