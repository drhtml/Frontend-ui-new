import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricePointContainerComponent } from './price-point-container.component';

describe('PricePointContainerComponent', () => {
  let component: PricePointContainerComponent;
  let fixture: ComponentFixture<PricePointContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PricePointContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PricePointContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
