import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAndPropertiesComponent } from './user-and-properties.component';

describe('UserAndPropertiesComponent', () => {
  let component: UserAndPropertiesComponent;
  let fixture: ComponentFixture<UserAndPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAndPropertiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAndPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
