import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyGridListComponent } from './property-grid-list.component';

describe('GridListComponent', () => {
  let component: PropertyGridListComponent;
  let fixture: ComponentFixture<PropertyGridListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PropertyGridListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PropertyGridListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
