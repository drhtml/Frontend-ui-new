import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as _ from 'lodash';
import { IContentfulImage } from 'src/app/interfaces/IContentfulImage';
import { IContentfulRichText } from 'src/app/interfaces/IContentfulRichText';
import { lpad } from 'src/app/utils/string';

@Component({
  selector: 'app-section-why-use-my-canary',
  templateUrl: './section-why-use-my-canary.component.html',
  styleUrls: ['./section-why-use-my-canary.component.scss'],
})
export class SectionWhyUseMyCanaryComponent implements OnInit, OnChanges {
  @Input() whyUseMyCanary?: IContentfulRichText;
  imageData?: IContentfulImage;
  public htmlContent = '';

  constructor(private sanitized: DomSanitizer) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (
      !!changes['whyUseMyCanary'] &&
      this.whyUseMyCanary &&
      !_.isEqual(
        changes['whyUseMyCanary'].currentValue,
        changes['whyUseMyCanary'].previousValue
      )
    ) {
      let newContent = '';
      _.forEach(this.whyUseMyCanary.content, (item1, index) => {
        if (item1.nodeType === 'heading-3') {
          newContent += `<h3>${item1.content[0].value}</h3>`;
        } else if (
          item1.nodeType === 'paragraph' &&
          this.whyUseMyCanary &&
          index !== this.whyUseMyCanary.content.length - 1 &&
          !item1.content[0].value
        ) {
          newContent += `<br /><br />`;
        } else if (item1.nodeType === 'paragraph' && !!item1.content[0].value) {
          newContent += `${item1.content[0].value}`;
        } else if (item1.nodeType === 'unordered-list') {
          newContent += `<ul>`;
          _.forEach(item1.content, (item2, index2) => {
            if (item2.nodeType === 'list-item' && item2.content) {
              const indexString = `${index2 + 1}`;
              newContent += `<li><div id="why-use-my-canvas-ball-list-${indexString}" class="number"><span>${lpad(
                indexString,
                2,
                '0'
              )}</span></div>${
                item2.content[0].content[0].value
              }<div order="28" class="animate-point point-28 point-sub-${index2}" order2="${index2}" duration="2" hide-element="#why-use-my-canvas-ball-list-${indexString}"></div></li>`;
            }
          });
          newContent += `</ul>`;
        } else if (item1.nodeType === 'embedded-asset-block') {
          this.imageData = item1.data?.target;
        }
      });
      this.htmlContent = this.sanitized.bypassSecurityTrustHtml(
        newContent
      ) as string;
    }
  }
}
