import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoadingModalComponent } from '../components/loading-modal/loading-modal.component';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private count = 0;
  private ref?: MatDialogRef<LoadingModalComponent>;

  constructor(private dialog: MatDialog) {}

  start(message?: string) {
    if (this.ref) {
      this.count += 1;
      return;
    }

    this.ref = this.dialog.open(LoadingModalComponent, {
      disableClose: true,
      data: message == '' || message == undefined ? 'Loading...' : message,
      panelClass: 'no-background-and-shadow',
    });
  }

  stop() {
    if (this.count === 0) {
      this.ref?.close();
      this.ref = undefined;
    } else {
      this.count -= 1;
    }
  }
}
