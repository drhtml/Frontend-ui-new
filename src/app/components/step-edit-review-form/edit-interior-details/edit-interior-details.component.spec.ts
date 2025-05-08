import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInteriorDetailsComponent } from './edit-interior-details.component';

describe('EditInteriorDetailsComponent', () => {
  let component: EditInteriorDetailsComponent;
  let fixture: ComponentFixture<EditInteriorDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditInteriorDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditInteriorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
