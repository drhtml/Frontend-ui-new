import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteThisPropertyRightComponent } from './delete-this-property-right.component';

describe('DeleteThisPropertyRightComponent', () => {
  let component: DeleteThisPropertyRightComponent;
  let fixture: ComponentFixture<DeleteThisPropertyRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteThisPropertyRightComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteThisPropertyRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
