import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as _ from 'lodash';
import { forkJoin } from 'rxjs';
import { AutoUnsubscribeComponent } from 'src/app/components/auto-unsubscribe/auto-unsubscribe.component';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { IFailRequest } from 'src/app/interfaces/backendResponse/IFailRequest';
import {
  emptyIRequestPersonalInfo,
  updateFormDataToIRequestPersonalInfo,
} from 'src/app/interfaces/backendResponse/IRequestPersonalInfo';
import { IResponsePersonalInfo } from 'src/app/interfaces/backendResponse/IResponsePersonalInfo';
import { ProfileSettingsService } from 'src/app/services/profile-settings.service';

@Component({
  selector: 'app-edit-personal-info',
  templateUrl: './edit-personal-info.component.html',
  styleUrls: ['./edit-personal-info.component.scss'],
})
export class EditPersonalInfoComponent
  extends AutoUnsubscribeComponent
  implements OnInit
{
  @Input() form = new FormGroup<any>({});
  @Input() responsePersonalInfo?: IResponsePersonalInfo;

  constructor(
    public dialog: MatDialog,
    public profileSettingsService: ProfileSettingsService,
    private _snackBar: MatSnackBar
  ) {
    super();
  }

  ngOnInit(): void {}

  getControl(key: string): FormControl {
    return this.form.get(key) as FormControl;
  }

  submitForm() {
    Object.keys(this.form.controls).forEach((key) => {
      this.form.get(key)?.markAsDirty();
      this.form.get(key)?.markAsTouched();
    });
    if (this.form.invalid) {
      return;
    }

    const formData = this.form.value;
    const requestBody = _.cloneDeep(emptyIRequestPersonalInfo);
    updateFormDataToIRequestPersonalInfo(
      requestBody,
      this.responsePersonalInfo,
      formData
    );
    this.addSubscriptions(
      forkJoin({
        updateInfo: this.profileSettingsService.updatePersonalInfo(
          requestBody,
          formData
        ),
        updatePhoto: this.profileSettingsService.uploadProfilePicture(
          formData.avatar
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
              title: 'Personal Info Updated',
              content: 'Your info have been updated successfully.',
              isYesNo: false,
            },
          });
        }
      })
    );
  }
}
