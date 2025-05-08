import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { gsap, Power2, Linear, Bounce } from 'gsap';
import MotionPathPlugin from 'gsap/MotionPathPlugin';
import * as _ from 'lodash';
import {
  getOffsetBetweenChildAndParent,
  isHidden,
} from 'src/app/utils/element';

interface IAnimationPoint {
  top: number;
  left: number;
  order: number;
  order2: number;
  bounceY: number | 'pointInfo' | 'nextPoint';
  bounceX: number | 'pointInfo' | 'nextPoint';
  duration: string;
  hideElement: string;
  type: 'bounce' | 'hide' | '';
}

@Component({
  selector: 'app-ball-animation',
  templateUrl: './ball-animation.component.html',
  styleUrls: ['./ball-animation.component.scss'],
  host: {
    '(click)': 'scroll($event)',
  },
})
export class BallAnimationComponent implements OnInit {
  points: IAnimationPoint[] = [];
  animation?: gsap.core.Timeline;
  startPoint = 0;
  @ViewChild('ballElement') refOfBallElement: any;
  @ViewChild('ballShadow') refOfBallShadow: any;
  @ViewChild('ballArrowUp') refOfArrowUp: any;
  @ViewChild('ballArrowUp2') refOfArrowUp2: any;

  constructor(private elRef: ElementRef) {
    gsap.registerPlugin(MotionPathPlugin);
  }

  ngOnInit(): void {
    setTimeout(() => {
      gsap.set(this.elRef.nativeElement, {
        opacity: 0,
      });
      gsap.set(this.refOfBallShadow.nativeElement, {
        opacity: 0,
      });
      gsap.set(this.refOfArrowUp.nativeElement, {
        opacity: 0,
      });
      gsap.set(this.refOfArrowUp2.nativeElement, {
        opacity: 0,
      });
    });
  }

  resetAnimation(): void {
    if (this.animation) {
      this.animation.kill();
      this.animation = undefined;
    }
    const landingPage = document.querySelector('app-landing');
    const allAnimatePoints = document.querySelectorAll('.animate-point');
    this.points = [];
    _.forEach(allAnimatePoints, (point) => {
      if (isHidden(point)) {
        return;
      }
      const position = getOffsetBetweenChildAndParent(point, landingPage);
      const bounceY = point.getAttribute('bounceY') || '';
      const bounceX = point.getAttribute('bounceX') || '';
      const pointInfo = {
        top: position.top,
        left: position.left,
        order: parseInt(point.getAttribute('order') || '0', 10),
        order2: parseInt(point.getAttribute('order2') || '0', 10),
        bounceY:
          ['pointInfo', 'nextPoint'].indexOf(bounceY) >= 0
            ? bounceY
            : (parseInt(bounceY || '-50', 10) as any),
        bounceX:
          ['pointInfo', 'nextPoint'].indexOf(bounceX) >= 0
            ? bounceX
            : (parseInt(bounceX || '0', 10) as any),
        type: point.getAttribute('type') as any,
        duration: point.getAttribute('duration') as string,
        hideElement: point.getAttribute('hide-element') as string,
      };
      this.points.push(pointInfo);
    });
    this.points = _.orderBy(this.points, ['order', 'order2'], ['asc', 'asc']);

    if (this.points.length !== 0) {
      gsap.set(this.elRef.nativeElement, {
        left: this.points[this.startPoint].left,
        top: this.points[this.startPoint].top,
      });
    }
    this.refOfBallShadow.nativeElement.setAttribute('cy', '37');
    this.refOfBallElement.nativeElement.setAttribute('cy', '18');

    this.createAnimation();
  }

  nextAnimation(progress: number) {
    if (this.animation) {
      this.animation.progress(progress).pause();
    }
  }

  createAnimation() {
    this.animation = gsap.timeline();
    this.animation.set(this.elRef.nativeElement, {
      left: this.points[this.startPoint].left,
      top: this.points[this.startPoint].top,
      opacity: 1,
    });
    this.animation.set(this.refOfBallShadow.nativeElement, {
      opacity: 0,
    });
    this.animation.set(this.refOfArrowUp.nativeElement, {
      opacity: 0,
    });
    this.animation.set(this.refOfArrowUp2.nativeElement, {
      opacity: 0,
    });

    for (let i = this.startPoint; i < this.points.length; i++) {
      const pointInfo = this.points[i];

      if (pointInfo.hideElement) {
        this.animation.set(document.querySelector(pointInfo.hideElement), {
          opacity: 0,
        });
      }
    }

    for (let i = this.startPoint; i < this.points.length - 1; i++) {
      const pointInfo = this.points[i];
      const nextPoint = this.points[i + 1];
      if (pointInfo.hideElement) {
        this.animation.set(document.querySelector(pointInfo.hideElement), {
          opacity: 1,
        });
      }

      if (pointInfo.type === 'bounce') {
        let middleTop = (pointInfo.top + nextPoint.top) / 2;
        if (pointInfo.bounceY === 'pointInfo') {
          middleTop = pointInfo.top;
        } else if (pointInfo.bounceY === 'nextPoint') {
          middleTop = nextPoint.top;
        } else {
          middleTop += pointInfo.bounceY as number;
        }
        let middleLeft = (pointInfo.left + nextPoint.left) / 2;
        if (pointInfo.bounceX === 'pointInfo') {
          middleLeft = pointInfo.top;
        } else if (pointInfo.bounceX === 'nextPoint') {
          middleLeft = nextPoint.left;
        } else {
          middleLeft += pointInfo.bounceX as number;
        }
        this.animation.set(this.refOfBallShadow.nativeElement, {
          opacity: 0,
        });
        this.animation.to(this.elRef.nativeElement, {
          duration: pointInfo.duration || 1,
          ease: Linear.easeIn,
          motionPath: {
            path: [
              { left: pointInfo.left, top: pointInfo.top },
              {
                left: middleLeft,
                top: middleTop,
              },
              { left: nextPoint.left, top: nextPoint.top },
            ],
            curviness: 1,
          },
        });

        this.animation.set(this.refOfBallShadow.nativeElement, {
          opacity: 1,
        });

        this.animation.set(this.refOfBallShadow.nativeElement, {
          opacity: 1,
          delay: 0.02,
        });
      } else {
        if (pointInfo.type === 'hide') {
          this.animation.set(this.elRef.nativeElement, {
            opacity: 0,
          });
        }
        this.animation.to(this.elRef.nativeElement, {
          ease: Linear.easeIn,
          left: nextPoint.left,
          top: nextPoint.top,
          duration: pointInfo.duration || 1,
        });
        this.animation.set(this.elRef.nativeElement, {
          opacity: 1,
        });
      }

      if (nextPoint.hideElement) {
        this.animation.set(document.querySelector(nextPoint.hideElement), {
          opacity: 0,
        });
      }
    }
    this.animation.set(this.refOfBallShadow.nativeElement, {
      opacity: 1,
      attr: { cy: 42 },
    });
    this.animation.to(this.refOfBallElement.nativeElement, {
      ease: Power2.easeOut,
      attr: { cy: 18 - 100 },
      duration: 0.5,
    });
    this.animation.to(this.refOfBallElement.nativeElement, {
      ease: Bounce.easeOut,
      attr: { cy: 18 },
      duration: 0.5,
    });

    this.animation.set(this.refOfArrowUp.nativeElement, {
      opacity: 1,
    });
    this.animation.set(this.refOfArrowUp2.nativeElement, {
      opacity: 1,
    });
    this.animation.pause();
  }

  scroll(event: any) {
    if (this.animation) {
      this.animation.restart();
    }
  }
}
