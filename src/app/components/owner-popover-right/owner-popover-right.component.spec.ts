import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerPopoverRightComponent } from './owner-popover-right.component';

describe('OwnerPopoverRightComponent', () => {
  let component: OwnerPopoverRightComponent;
  let fixture: ComponentFixture<OwnerPopoverRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerPopoverRightComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnerPopoverRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
