import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricePointListComponent } from './price-point-list.component';

describe('PricePointListComponent', () => {
  let component: PricePointListComponent;
  let fixture: ComponentFixture<PricePointListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PricePointListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PricePointListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
