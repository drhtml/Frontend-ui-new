import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSayItemComponent } from './customer-say-item.component';

describe('CustomerSayItemComponent', () => {
  let component: CustomerSayItemComponent;
  let fixture: ComponentFixture<CustomerSayItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerSayItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerSayItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
