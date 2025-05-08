import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragAndDropRegionComponent } from './drag-and-drop-region.component';

describe('DragAndDropRegionComponent', () => {
  let component: DragAndDropRegionComponent;
  let fixture: ComponentFixture<DragAndDropRegionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragAndDropRegionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DragAndDropRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
