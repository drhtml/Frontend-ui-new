import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs';
import { AutoUnsubscribeComponent } from 'src/app/components/auto-unsubscribe/auto-unsubscribe.component';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { IFailRequest } from 'src/app/interfaces/backendResponse/IFailRequest';
import { IResponseNotificationSettings } from 'src/app/interfaces/backendResponse/IResponseNotificationSettings';
import { IOptionField } from 'src/app/interfaces/IOptionField';
import { IScreenSize } from 'src/app/interfaces/IScreenSize';
import { ProfileSettingsService } from 'src/app/services/profile-settings.service';

@Component({
  selector: 'app-edit-notifications-settings',
  templateUrl: './edit-notifications-settings.component.html',
  styleUrls: ['./edit-notifications-settings.component.scss'],
})
export class EditNotificationsSettingsComponent
  extends AutoUnsubscribeComponent
  implements OnInit
{
  frequencyOptions: IOptionField[] = [
    {
      label: 'Once a day',
      key: 'ONCE_A_DAY',
    },
    {
      label: 'Twice a day.',
      key: 'TWICE_A_DAY',
    },
    {
      label: 'Real-time',
      key: 'IN_REAL_TIME',
    },
  ];
  @Input() form = new FormGroup<any>({});

  @Input() settingForm = new FormGroup<any>({
    notificationChannel: new FormControl(''),
    notificationFrequency: new FormControl(''),
  });

  constructor(
    public dialog: MatDialog,
    public profileSettingsService: ProfileSettingsService,
    private _snackBar: MatSnackBar
  ) {
    super();
  }

  ngOnInit(): void {
    this.addSubscriptions(
      this.profileSettingsService
        .fetchNotificationSettings()
        .subscribe((rs) => {
          if (rs.success === false) {
            const failResponse = rs as IFailRequest;
            this._snackBar.open(failResponse.message, 'CLOSE', {
              verticalPosition: 'top',
              panelClass: 'error',
              duration: 3000,
            });
          } else {
            const successResponse = rs as IResponseNotificationSettings;
            this.settingForm.patchValue({
              notificationChannel: successResponse.data.notificationChannel,
              notificationFrequency: successResponse.data.notificationFrequency,
            });
          }
        })
    );
  }

  getControl(key: string): FormControl {
    return this.settingForm.get(key) as FormControl;
  }

  getParentControl(key: string): FormControl {
    return this.form.get(key) as FormControl;
  }

  submitForm() {
    const formData = this.settingForm.value;
    this.addSubscriptions(
      forkJoin({
        updateInfo: this.profileSettingsService.updateNotificationSettings(
          formData.notificationChannel,
          formData.notificationFrequency
        ),
        updatePhoto: this.profileSettingsService.uploadProfilePicture(
          this.form.value.avatar
        ),
      }).subscribe((rs) => {
        let failResponse: IFailRequest | null = null;
        if (rs.updateInfo.success === false) {
          failResponse = rs.updateInfo as IFailRequest;
        }

        if (failResponse) {
          this._snackBar.open(failResponse.message, 'CLOSE', {
            verticalPosition: 'top',
            panelClass: 'error',
            duration: 3000,
          });
        } else {
          this.dialog.open(ConfirmationDialogComponent, {
            width: '584px',
            maxWidth: 'calc(100vw - 20px)',
            data: {
              title: 'Notifications Settings Updated',
              content:
                'Your notifications settings have been updated successfully.',
              isYesNo: false,
            },
          });
        }
      })
    );
  }
}
