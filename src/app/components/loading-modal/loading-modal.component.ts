import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-loading-modal',
  templateUrl: './loading-modal.component.html',
  styleUrls: ['./loading-modal.component.scss'],
})
export class LoadingModalComponent implements OnInit {
  public loadingData: any;
  constructor(
    public dialogRef: MatDialogRef<LoadingModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.loadingData = data;
  }

  ngOnInit(): void {}
}
