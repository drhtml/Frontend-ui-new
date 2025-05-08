import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAndPropertiesGridComponent } from './user-and-properties-grid.component';

describe('UserAndPropertiesGridComponent', () => {
  let component: UserAndPropertiesGridComponent;
  let fixture: ComponentFixture<UserAndPropertiesGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAndPropertiesGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAndPropertiesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
