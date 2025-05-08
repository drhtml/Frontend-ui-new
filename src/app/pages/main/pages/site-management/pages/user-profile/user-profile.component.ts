import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { forkJoin } from 'rxjs';
import { AutoUnsubscribeComponent } from 'src/app/components/auto-unsubscribe/auto-unsubscribe.component';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { convertFromIFormUserProfileDetailToIIUpdateProfileRequest } from 'src/app/interfaces/backendRequest/IUpdateProfile';
import { IFailRequest } from 'src/app/interfaces/backendResponse/IFailRequest';
import { IFetchPropertiesSuccess } from 'src/app/interfaces/backendResponse/IResponseProperty';
import {
  IFetchOneUserSuccess,
  IResponseUserNotificationSettings,
} from 'src/app/interfaces/backendResponse/IResponseUser';
import { ISuccessRequest } from 'src/app/interfaces/backendResponse/ISuccessRequest';
import { IFile } from 'src/app/interfaces/IFile';
import { IProperty } from 'src/app/interfaces/IProperty';
import { PropertyService } from 'src/app/services/property.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent
  extends AutoUnsubscribeComponent
  implements OnInit
{
  isEdit = false;
  selectedTab = 0;
  userId = '';
  public avatarField = new FormControl({
    url: '',
    file: null as IFile,
  });
  propertyList: IProperty[] = [];
  checkValid: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    let password = group.get('password')?.value;
    let confirmPassword = group.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return {
        paswordNotMatch: true,
      };
    }

    return null;
  };
  profileForm = new FormGroup(
    {
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      address: new FormControl(''),
      phoneNumber: new FormControl(''),
      customerType: new FormControl(''),
      email: new FormControl('', [Validators.email]),
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
      receiveNotificationBy: new FormControl(''),
      notificationFrequency: new FormControl(''),
      lastLogin: new FormControl(''),
    },
    { validators: this.checkValid }
  );

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    public propertyService: PropertyService,
    public usersService: UsersService,
    private _snackBar: MatSnackBar
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.userId = paramMap.get('id') as string;
    });
    this.route.queryParams.subscribe((paramMap) => {
      if (paramMap['isEdit'] === 'true') {
        this.isEdit = true;
      }
    });

    if (this.userId) {
      this.addSubscriptions(
        this.propertyService.fetchProperties(this.userId).subscribe((rs) => {
          if (rs.success === false) {
            const failResponse = rs as IFailRequest;
            this._snackBar.open(failResponse.message, 'CLOSE', {
              verticalPosition: 'top',
              panelClass: 'error',
              duration: 3000,
            });
          } else {
            const successResponse = rs as IFetchPropertiesSuccess;
            this.propertyList = successResponse.items;
          }
        })
      );
      this.fetchUser();
    }
  }

  validateBackendError(rs: IFailRequest | null) {
    if (rs && rs.success === false) {
      const failResponse = rs as IFailRequest;
      this._snackBar.open(failResponse.message, 'CLOSE', {
        verticalPosition: 'top',
        panelClass: 'error',
        duration: 3000,
      });
      return false;
    }
    return true;
  }

  fetchUser() {
    this.addSubscriptions(
      this.usersService.fetchUser(this.userId).subscribe((rs) => {
        if (this.validateBackendError(rs as IFailRequest)) {
          const userProfile = (rs as IFetchOneUserSuccess).data;
          const userAvatar = _.get(rs, 'data.profilePicture.url');
          if (this.avatarField && this.avatarField.value) {
            this.avatarField.patchValue({
              file: this.avatarField.value.file as IFile,
              url: userAvatar || '',
            });
          }
          this.profileForm.patchValue({
            firstName: userProfile.firstName,
            lastName: userProfile.lastName,
            address: userProfile.address,
            email: userProfile.email,
            phoneNumber: userProfile.phoneNumber,
            customerType: userProfile.type,
            lastLogin: userProfile.lastLogin,
          });

          this.fetchUserNotificationSettings();
        }
      })
    );
  }

  fetchUserNotificationSettings() {
    this.addSubscriptions(
      this.usersService
        .fetchUserNotificationSettings(this.userId)
        .subscribe((rs) => {
          if (this.validateBackendError(rs as IFailRequest)) {
            const userNotificationSettings = (rs as ISuccessRequest)
              .data as IResponseUserNotificationSettings;
            this.profileForm.patchValue({
              receiveNotificationBy:
                userNotificationSettings.notificationChannel,
              notificationFrequency:
                userNotificationSettings.notificationFrequency,
            });
          }
        })
    );
  }

  doSaveUser(): void {
    const profileFormValue = this.profileForm.value;
    const data =
      convertFromIFormUserProfileDetailToIIUpdateProfileRequest(
        profileFormValue
      );

    this.addSubscriptions(
      forkJoin({
        updateUser: this.usersService.updateUser(this.userId, data),
        updateUserEmail: this.usersService.updateUserEmail(
          this.userId,
          profileFormValue.email
        ),
        updateUserPassword: this.usersService.updateUserPassword(
          this.userId,
          profileFormValue.password
        ),
        updateUserNotificationSettings:
          this.usersService.updateUserNotificationSettings(
            this.userId,
            profileFormValue.receiveNotificationBy || '',
            profileFormValue.notificationFrequency || ''
          ),
        uploadUserProfilePicture: this.usersService.uploadUserProfilePicture(
          this.userId,
          _.get(this.avatarField.value, 'file')
        ),
      }).subscribe((rs) => {
        let failResponse: IFailRequest | null = null;
        if (rs.updateUser.success === false) {
          failResponse = rs.updateUser as IFailRequest;
        } else if (rs.uploadUserProfilePicture.success === false) {
          failResponse = rs.uploadUserProfilePicture as IFailRequest;
        } else if (rs.updateUserEmail.success === false) {
          failResponse = rs.updateUserEmail as IFailRequest;
        } else if (rs.updateUserPassword.success === false) {
          failResponse = rs.updateUserPassword as IFailRequest;
        } else if (rs.updateUserNotificationSettings.success === false) {
          failResponse = rs.updateUserNotificationSettings as IFailRequest;
        }

        if (this.validateBackendError(failResponse)) {
          const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            width: '584px',
            maxWidth: 'calc(100vw - 20px)',
            data: {
              title: 'User Profile Updated',
              content: 'The User Profile have been updated successfully.',
              isYesNo: false,
            },
          });

          dialogRef.afterClosed().subscribe((result) => {
            this.isEdit = false;
          });
        }
      })
    );
  }
}
