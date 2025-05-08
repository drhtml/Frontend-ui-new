import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAsToggleComponent } from './view-as-toggle.component';

describe('ViewAsToggleComponent', () => {
  let component: ViewAsToggleComponent;
  let fixture: ComponentFixture<ViewAsToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAsToggleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAsToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
