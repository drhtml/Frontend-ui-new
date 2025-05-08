import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as _ from 'lodash';
import { IContentfulRichText } from 'src/app/interfaces/IContentfulRichText';

@Component({
  selector: 'app-section-welcome-to-my-canary',
  templateUrl: './section-welcome-to-my-canary.component.html',
  styleUrls: ['./section-welcome-to-my-canary.component.scss']
})
export class SectionWelcomeToMyCanaryComponent implements OnInit, OnChanges {
  @Input() welcomeToMyCanary?: IContentfulRichText;
  public htmlContent = '';

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      !!changes['welcomeToMyCanary'] &&
      this.welcomeToMyCanary &&
      !_.isEqual(
        changes['welcomeToMyCanary'].currentValue,
        changes['welcomeToMyCanary'].previousValue
      )
    ) {
      let newContent = '';
      _.forEach(this.welcomeToMyCanary.content, (item1, index) => {
        if (item1.nodeType === 'heading-4') {
          newContent += `<h4 class="font-bold">${item1.content[0].value}</h4>`;
        } else if (item1.nodeType === 'heading-5') {
          newContent += `<span class="body-2 font-semibold color-Pastel">${item1.content[0].value}</span>`;
        } else if (
          item1.nodeType === 'paragraph' &&
          this.welcomeToMyCanary &&
          index !== this.welcomeToMyCanary.content.length - 1 &&
          !item1.content[0].value
        ) {
          newContent += `<div class="br" />`;
        } else if (
          item1.nodeType === 'paragraph' &&
          !!item1.content[0].value
        ) {
          newContent += `<span class="body-2 font-medium">${item1.content[0].value}</span>`;
        }
      });
      this.htmlContent = newContent;
    }
  }

}
