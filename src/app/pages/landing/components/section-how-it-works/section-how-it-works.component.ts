import {
  Component,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import * as _ from 'lodash';
import { IContentfulCardItem } from 'src/app/interfaces/IContentfulCardItem';
import { WIDTH_MOBILE_MAX, WIDTH_TABLET_MAX } from 'src/app/utils/responsive';

@Component({
  selector: 'app-section-how-it-works',
  templateUrl: './section-how-it-works.component.html',
  styleUrls: ['./section-how-it-works.component.scss'],
})
export class SectionHowItWorksComponent implements OnInit, OnChanges {
  innerWidth = 0;
  @Input() howItWorks: IContentfulCardItem[] = [];
  datas: {
    top: number;
    data: IContentfulCardItem;
  }[] = [];

  constructor() {}

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.updateMarginTop();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      !!changes['howItWorks'] &&
      !_.isEqual(
        changes['howItWorks'].currentValue,
        changes['howItWorks'].previousValue
      )
    ) {
      this.datas = this.howItWorks.map((item) => ({
        top: 0,
        data: item,
      }));
      this.onResize();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
    this.updateMarginTop();
  }

  updateMarginTop() {
    let paddingLeftRight = 83 * 2;
    if (this.innerWidth <= WIDTH_TABLET_MAX) {
      paddingLeftRight = 57 * 2;
    }
    let marginTopUnit = 38;
    let topSpace = 41;
    if (this.innerWidth <= WIDTH_MOBILE_MAX) {
      topSpace = 48;
    }
    const cellWidth = 240;
    let totalWidth = this.innerWidth - paddingLeftRight;

    let index = 0;
    _.forEach(this.datas, (d, i) => {
      if (totalWidth < cellWidth) {
        index = 0;
        totalWidth = this.innerWidth - paddingLeftRight;
        totalWidth -= cellWidth;
      } else {
        totalWidth -= cellWidth;
      }
      d.top = topSpace + marginTopUnit * index;
      index += 1;
    });
  }
}
