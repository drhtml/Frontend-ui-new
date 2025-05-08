import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesTableViewComponent } from './properties-table-view.component';

describe('PropertiesTableViewComponent', () => {
  let component: PropertiesTableViewComponent;
  let fixture: ComponentFixture<PropertiesTableViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertiesTableViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertiesTableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
