import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragAndDropFieldComponent } from './drag-and-drop-field.component';

describe('DragAndDropFieldComponent', () => {
  let component: DragAndDropFieldComponent;
  let fixture: ComponentFixture<DragAndDropFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragAndDropFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DragAndDropFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
