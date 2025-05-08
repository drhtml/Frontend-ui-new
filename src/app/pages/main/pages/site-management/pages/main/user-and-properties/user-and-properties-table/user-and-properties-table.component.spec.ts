import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAndPropertiesTableComponent } from './user-and-properties-table.component';

describe('UserAndPropertiesTableComponent', () => {
  let component: UserAndPropertiesTableComponent;
  let fixture: ComponentFixture<UserAndPropertiesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAndPropertiesTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAndPropertiesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
