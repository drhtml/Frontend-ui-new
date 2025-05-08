import { Component, Input, OnInit } from '@angular/core';
import { IThemeColor } from 'src/app/interfaces/ITheme';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  host: {
    '[class.isDiabled]': 'disabled',
  },
})
export class ButtonComponent implements OnInit {
  @Input() type:
    | 'primary'
    | 'basic'
    | 'secondary'
    | 'secondary-link'
    | 'icon'
    | 'outline' = 'primary';
  @Input() size:
    | 'normal'
    | 'small'
    | 'large'
    | 'very-large'
    | 'small'
    | 'very-small' = 'normal';
  @Input() shouldIgnoreHover = false;
  @Input() disabled = false;
  @Input() showBall = false;
  @Input() color: IThemeColor = 'primary';
  @Input() iconLeft = '';
  @Input() iconLeftHover = '';
  @Input() iconRight = '';
  @Input() iconRightHover = '';
  @Input() iconRightWidth = '';
  @Input() noContent = false;
  @Input() doNotUpdateImageSize = false;
  @Input() hrefLink = '';

  constructor() {}

  ngOnInit(): void {}
}
