import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceEvolutionComponent } from './price-evolution.component';

describe('PriceEvolutionComponent', () => {
  let component: PriceEvolutionComponent;
  let fixture: ComponentFixture<PriceEvolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceEvolutionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceEvolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
