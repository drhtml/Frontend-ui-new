import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionBottomComponent } from './section-bottom.component';

describe('SectionBottomComponent', () => {
  let component: SectionBottomComponent;
  let fixture: ComponentFixture<SectionBottomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionBottomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionBottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
