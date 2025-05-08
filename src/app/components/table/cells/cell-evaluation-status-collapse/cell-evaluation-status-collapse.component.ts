import { Component, Input, OnInit } from '@angular/core';
import { IEvaluationStatus } from 'src/app/interfaces/IProperty';

@Component({
  selector: 'app-cell-evaluation-status-collapse',
  templateUrl: './cell-evaluation-status-collapse.component.html',
  styleUrls: ['./cell-evaluation-status-collapse.component.scss'],
  host: {
    '[class.isNotStarted]': "value === 'Not Started'",
    '[class.isInProgress]': "value === 'In Progress'",
    '[class.isCompleted]': "value === 'Completed'",
  },
})
export class CellEvaluationStatusCollapseComponent implements OnInit {
  @Input() value: IEvaluationStatus = '';

  constructor() {}

  ngOnInit(): void {}

  getTooltipClass(): string {
    if (this.value === 'Not Started') {
      return 'EvaluationStatus statusIsNotStarted';
    }
    if (this.value === 'In Progress') {
      return 'EvaluationStatus statusIsInProgress';
    }
    if (this.value === 'Completed') {
      return 'EvaluationStatus statusIsCompleted';
    }
    return '';
  }
}
