import { Component, Input, OnInit } from '@angular/core';
import { IEvaluationStatus } from 'src/app/interfaces/IProperty';

@Component({
  selector: 'app-cell-evaluation-status',
  templateUrl: './cell-evaluation-status.component.html',
  styleUrls: ['./cell-evaluation-status.component.scss'],
  host: {
    '[class.isNotStarted]': "value === 'Not Started'",
    '[class.isInProgress]': "value === 'In Progress'",
    '[class.isCompleted]': "value === 'Completed'",
    '[class.isYes]': "value === 'Yes'",
    '[class.isNo]': "value === 'No'",
  },
})
export class CellEvaluationStatusComponent implements OnInit {
  @Input() value: IEvaluationStatus = '';

  constructor() {}

  ngOnInit(): void {}
}
