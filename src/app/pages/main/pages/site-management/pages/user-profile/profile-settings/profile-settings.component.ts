import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { MyErrorStateMatcher } from 'src/app/utils/form';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
})
export class ProfileSettingsComponent implements OnInit {
  @Input() isEdit = false;
  @Input() form: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    address: new FormControl(''),
    phoneNumber: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    receiveNotificationBy: new FormControl('Email'),
    notificationFrequency: new FormControl('In realtime'),
    customerType: new FormControl(''),
  });
  @Input() avatarField = new FormControl();
  @Output() setIsEdit = new EventEmitter<boolean>();
  @Output() doSaveUser = new EventEmitter();
  matcher = new MyErrorStateMatcher(['paswordNotMatch']);

  constructor(public dialog: MatDialog, public router: Router) {}

  ngOnInit(): void {}

  getFormControlField(key: string): FormControl {
    return this.form.get(key) as FormControl;
  }

  doDeleteUser(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '584px',
      maxWidth: 'calc(100vw - 20px)',
      data: {
        title: 'Delete User',
        content: `Are you sure wish to delete user <strong>${
          this.getFormControlField('lastName').value
        } ${
          this.getFormControlField('firstName').value
        }</strong>? This action will remove all user’s data completely and you won’t be able to undo this action.`,
        isYesNo: true,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.router.navigate(['/main/site-management/main'], {
          queryParams: { tab: 0 },
        });
      }
    });
  }

  get formErrorMessage(): string {
    if (this.form.hasError('paswordNotMatch')) {
      return 'Password is not matched.';
    }
    return '';
  }
}
