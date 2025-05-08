import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IPricePointSummary } from 'src/app/interfaces/IPricePointSummary';

@Component({
  selector: 'app-review-evaluations',
  templateUrl: './review-evaluations.component.html',
  styleUrls: ['./review-evaluations.component.scss'],
})
export class ReviewEvaluationsComponent implements OnInit {
  @Input() isAdmin = false;
  @Input() formControl: FormControl = new FormControl(5);
  @Input() datas: IPricePointSummary[] = [];
  selectedDate = 'May 15, 2022';

  constructor() {}

  ngOnInit(): void {}
}
