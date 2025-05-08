import { Component, Input, OnInit } from '@angular/core';

export interface IReviewSectionData {
  title1?: string;
  title2?: string;
  items: string[];
}

@Component({
  selector: 'app-review-field-section',
  templateUrl: './review-field-section.component.html',
  styleUrls: ['./review-field-section.component.scss'],
  host: {
    '[class]': "'theme-' + theme",
  },
})
export class ReviewFieldSectionComponent implements OnInit {
  @Input() data: IReviewSectionData[] = [];
  constructor() {}

  ngOnInit(): void {}
}
