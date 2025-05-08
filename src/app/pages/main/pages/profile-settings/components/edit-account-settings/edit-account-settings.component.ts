import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs';
import { AutoUnsubscribeComponent } from 'src/app/components/auto-unsubscribe/auto-unsubscribe.component';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { IFailRequest } from 'src/app/interfaces/backendResponse/IFailRequest';
import { ProfileSettingsService } from 'src/app/services/profile-settings.service';
import { MyErrorStateMatcher } from 'src/app/utils/form';

@Component({
  selector: 'app-edit-account-settings',
  templateUrl: './edit-account-settings.component.html',
  styleUrls: ['./edit-account-settings.component.scss'],
})
export class EditAccountSettingsComponent
  extends AutoUnsubscribeComponent
  implements OnInit
{
  @Input() form = new FormGroup<any>({});
  checkValid: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    let email = group.get('accountSettingEmail')?.value;
    let password = group.get('accountSettingPassword')?.value;

    if (!email && !password) {
      return {
        required: true,
      };
    }

    if (!!email && !!password) {
      return {
        sameTime: true,
      };
    }

    return null;
  };
  matcher = new MyErrorStateMatcher();

  @Input() settingForm = new FormGroup<any>(
    {
      accountSettingEmail: new FormControl(''),
      accountSettingOldPassword: new FormControl(''),
      accountSettingPassword: new FormControl(''),
    },
    { validators: this.checkValid }
  );

  constructor(
    public dialog: MatDialog,
    public profileSettingsService: ProfileSettingsService,
    private _snackBar: MatSnackBar
  ) {
    super();
  }

  ngOnInit(): void {}

  getControl(key: string): FormControl {
    return this.settingForm.get(key) as FormControl;
  }

  getParentControl(key: string): FormControl {
    return this.form.get(key) as FormControl;
  }

  submitForm() {
    Object.keys(this.settingForm.controls).forEach((key) => {
      this.settingForm.get(key)?.markAsDirty();
      this.settingForm.get(key)?.markAsTouched();
    });

    if (this.settingForm.invalid) {
      return;
    }
    const formData = this.settingForm.value;

    let updateInfo;
    if (formData.accountSettingEmail) {
      updateInfo = this.profileSettingsService.updateEmail(
        formData.accountSettingEmail
      );
    } else {
      updateInfo = this.profileSettingsService.updatePassword(
        formData.accountSettingOldPassword,
        formData.accountSettingPassword
      );
    }

    this.addSubscriptions(
      forkJoin({
        updateInfo,
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
              title: 'Account Settings Updated',
              content: 'Your account settings have been updated successfully.',
              isYesNo: false,
            },
          });
        }
      })
    );
  }

  get formErrorMessage(): string {
    if (this.settingForm.hasError('sameTime')) {
      return 'Setting an email / changing a password cannot be done at the same time';
    }
    if (this.settingForm.hasError('required')) {
      return 'One field required';
    }
    return '';
  }
}
