import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionWhatOurCustomerSayComponent } from './section-what-our-customer-say.component';

describe('SectionWhatOurCustomerSayComponent', () => {
  let component: SectionWhatOurCustomerSayComponent;
  let fixture: ComponentFixture<SectionWhatOurCustomerSayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionWhatOurCustomerSayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionWhatOurCustomerSayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
