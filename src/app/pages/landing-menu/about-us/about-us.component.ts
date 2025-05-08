import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { ContentfulService } from 'src/app/services/contentful.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
})
export class AboutUsComponent implements OnInit {
  aboutUsString = '';

  constructor(private contentfulService: ContentfulService) {}

  ngOnInit(): void {
    this.contentfulService.fetchAboutUs().then((pages) => {
      const content = _.get(pages, '[0].fields.content.content', []);
      _.forEach(content, (item) => {
        this.aboutUsString = `${this.aboutUsString}${_.get(
          item,
          'content[0].value',
          ''
        )}`;
      });
    });
  }
}
