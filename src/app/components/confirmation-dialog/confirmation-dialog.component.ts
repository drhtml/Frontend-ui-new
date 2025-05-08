import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface IConfimationDialogData {
  title: string;
  content: string;
  isYesNo: boolean;
}

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent implements OnInit {
  title = 'Delete Property?';
  content =
    'Are sure you want to delete this property? This action will remove all property data completely and can not be undone.';
  isYesNo = true;
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IConfimationDialogData
  ) {
    if (data) {
      this.title = data.title;
      this.content = data.content;
      this.isYesNo = data.isYesNo;
    }
  }

  ngOnInit(): void {}

  doNo(): void {
    this.dialogRef.close(false);
  }

  doDelete(): void {
    this.dialogRef.close(true);
  }

  get popupIcon(): string {
    if (this.isYesNo) {
      return '../../../../../../../assets/icons/trash-big-Red.svg';
    }

    return '../../../../../../../assets/icons/check-circle-Teal.svg';
  }
}
