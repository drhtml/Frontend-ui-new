import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPricePointSummary } from 'src/app/interfaces/IPricePointSummary';

@Component({
  selector: 'app-price-points-summary-dialog',
  templateUrl: './price-points-summary-dialog.component.html',
  styleUrls: ['./price-points-summary-dialog.component.scss'],
})
export class PricePointsSummaryDialogComponent implements OnInit {
  datas: IPricePointSummary[] = [];

  constructor(
    public dialogRef: MatDialogRef<PricePointsSummaryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IPricePointSummary[]
  ) {
    this.datas = data;
  }

  ngOnInit(): void {}

  doClose(): void {
    this.dialogRef.close(false);
  }
}
