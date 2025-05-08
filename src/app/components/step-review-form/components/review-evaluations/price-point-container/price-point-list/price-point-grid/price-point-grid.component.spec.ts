import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricePointGridComponent } from './price-point-grid.component';

describe('PricePointGridComponent', () => {
  let component: PricePointGridComponent;
  let fixture: ComponentFixture<PricePointGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PricePointGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PricePointGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
