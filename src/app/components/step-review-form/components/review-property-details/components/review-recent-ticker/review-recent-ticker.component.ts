import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-review-recent-ticker',
  templateUrl: './review-recent-ticker.component.html',
  styleUrls: ['./review-recent-ticker.component.scss']
})
export class ReviewRecentTickerComponent implements OnInit {
  @Input() date: string = '';
  @Input() isActive = false;
  @Input() title: string = '';
  @Input() description: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
