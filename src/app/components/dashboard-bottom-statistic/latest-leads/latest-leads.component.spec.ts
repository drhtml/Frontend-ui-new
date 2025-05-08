import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestLeadsComponent } from './latest-leads.component';

describe('LatestLeadsComponent', () => {
  let component: LatestLeadsComponent;
  let fixture: ComponentFixture<LatestLeadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LatestLeadsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LatestLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
