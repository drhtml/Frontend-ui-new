import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesGridViewComponent } from './properties-grid-view.component';

describe('PropertiesGridViewComponent', () => {
  let component: PropertiesGridViewComponent;
  let fixture: ComponentFixture<PropertiesGridViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertiesGridViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertiesGridViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
