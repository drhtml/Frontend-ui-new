import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BallAnimationComponent } from './ball-animation.component';

describe('BallAnimationComponent', () => {
  let component: BallAnimationComponent;
  let fixture: ComponentFixture<BallAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BallAnimationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BallAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
