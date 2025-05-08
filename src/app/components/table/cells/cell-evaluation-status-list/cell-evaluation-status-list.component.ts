import { Component, Input, OnInit } from '@angular/core';
import { IEvaluationStatusCount } from 'src/app/interfaces/IUserInfo';

@Component({
  selector: 'app-cell-evaluation-status-list',
  templateUrl: './cell-evaluation-status-list.component.html',
  styleUrls: ['./cell-evaluation-status-list.component.scss'],
})
export class CellEvaluationStatusListComponent implements OnInit {
  @Input() value: IEvaluationStatusCount[] = [];

  constructor() {}

  ngOnInit(): void {}

  getTooltipClass(item: IEvaluationStatusCount): string {
    if (item.status === 'Not Started') {
      return 'EvaluationStatus statusIsNotStarted';
    }
    if (item.status === 'In Progress') {
      return 'EvaluationStatus statusIsInProgress';
    }
    if (item.status === 'Completed') {
      return 'EvaluationStatus statusIsCompleted';
    }
    return '';
  }
}
