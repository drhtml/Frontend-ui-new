import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

// todo: this component is removed by task : Remove home value popup
@Component({
  selector: 'app-property-evaluation-dialog',
  templateUrl: './property-evaluation-dialog.component.html',
  styleUrls: ['./property-evaluation-dialog.component.scss'],
})
export class PropertyEvaluationDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<PropertyEvaluationDialogComponent>
  ) {}

  ngOnInit(): void {}

  nextStep(): void {
    this.dialogRef.close(true);
  }
}
