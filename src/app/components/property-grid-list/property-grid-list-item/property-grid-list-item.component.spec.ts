import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyGridListItemComponent } from './property-grid-list-item.component';

describe('GridListItemComponent', () => {
  let component: PropertyGridListItemComponent;
  let fixture: ComponentFixture<PropertyGridListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyGridListItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyGridListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
