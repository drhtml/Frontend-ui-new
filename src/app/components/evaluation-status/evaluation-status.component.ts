import { Component, Input, OnInit } from '@angular/core';
import { IEvaluationStatus } from 'src/app/interfaces/IProperty';

@Component({
  selector: 'app-evaluation-status',
  templateUrl: './evaluation-status.component.html',
  styleUrls: ['./evaluation-status.component.scss'],
  host: {
    '[class.red]': "evaluationStatus === 'Not Started'",
    '[class.blue]': "evaluationStatus === 'In Progress'",
  },
})
export class EvaluationStatusComponent implements OnInit {
  @Input() evaluationStatus: IEvaluationStatus = '';

  constructor() {}

  ngOnInit(): void {}
}
