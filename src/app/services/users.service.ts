import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IFailRequest } from '../interfaces/backendResponse/IFailRequest';
import { ISuccessRequest } from '../interfaces/backendResponse/ISuccessRequest';
import {
  convertFromResponseUserToIManageUserInfo,
  IResponseUser,
  IResponseUserNotificationSettings,
} from '../interfaces/backendResponse/IResponseUser';
import { networkError } from '../utils/network';
import { AuthenticateService } from './authenticate.service';
import { LoadingService } from './loading.service';
import { IUpdateProfileRequest } from '../interfaces/backendRequest/IUpdateProfile';
import { IFile } from '../interfaces/IFile';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(
    private router: Router,
    private http: HttpClient,
    private loadingService: LoadingService,
    private authenticateService: AuthenticateService
  ) {}

  fetchUsers() {
    type responseType = {
      success: boolean;
      data: IResponseUser[];
    };

    this.loadingService.start();
    return this.http
      .get<responseType | IFailRequest>(
        `${environment.mycanaryBackendApi}/users`,
        {
          headers: {
            Authorization: this.authenticateService.accessToken,
          },
        }
      )
      .pipe(networkError(this.router))
      .pipe(
        map((value: responseType | IFailRequest) => {
          this.loadingService.stop();
          if (value.success !== false) {
            const successResponse = value as responseType;

            return {
              success: successResponse.success,
              items: successResponse.data.map((item) => {
                return convertFromResponseUserToIManageUserInfo(item);
              }),
            };
          }
          return value as IFailRequest;
        })
      );
  }

  fetchUser(userId: string) {
    type responseType = {
      success: boolean;
      data: IResponseUser;
    };

    this.loadingService.start();
    return this.http
      .get<responseType | IFailRequest>(
        `${environment.mycanaryBackendApi}/profile/${userId}`,
        {
          headers: {
            Authorization: this.authenticateService.accessToken,
          },
        }
      )
      .pipe(networkError(this.router))
      .pipe(
        map((value: responseType | IFailRequest) => {
          this.loadingService.stop();
          if (value.success !== false) {
            const successResponse = value as responseType;

            return {
              success: successResponse.success,
              data: successResponse.data,
            };
          }
          return value as IFailRequest;
        })
      );
  }

  fetchUserNotificationSettings(userId: string) {
    type responseType = {
      success: boolean;
      data: IResponseUserNotificationSettings;
    };

    this.loadingService.start();
    return this.http
      .get<responseType | IFailRequest>(
        `${environment.mycanaryBackendApi}/profile/${userId}/notification-settings`,
        {
          headers: {
            Authorization: this.authenticateService.accessToken,
          },
        }
      )
      .pipe(networkError(this.router))
      .pipe(
        map((value: responseType | IFailRequest) => {
          this.loadingService.stop();
          if (value.success !== false) {
            const successResponse = value as responseType;

            return {
              success: successResponse.success,
              data: successResponse.data,
            };
          }
          return value as IFailRequest;
        })
      );
  }

  updateUser(userId: string, data: IUpdateProfileRequest) {
    this.loadingService.start();
    return this.http
      .post<ISuccessRequest | IFailRequest>(
        `${environment.mycanaryBackendApi}/profile/${userId}`,
        data,
        {
          headers: {
            Authorization: this.authenticateService.accessToken,
          },
        }
      )
      .pipe(networkError(this.router))
      .pipe(
        map((value: ISuccessRequest | IFailRequest) => {
          this.loadingService.stop();
          return value;
        })
      );
  }

  uploadUserProfilePicture(userId: string, photo: IFile) {
    if (!photo) {
      return of({
        success: true,
      } as ISuccessRequest);
    }
    const formData = new FormData();
    formData.append('profilePicture', photo);

    this.loadingService.start();
    return this.http
      .post<ISuccessRequest | IFailRequest>(
        `${environment.mycanaryBackendApi}/profile/${userId}/profile-picture`,
        formData,
        {
          headers: {
            Authorization: this.authenticateService.accessToken,
          },
        }
      )
      .pipe(networkError(this.router))
      .pipe(
        map((value: ISuccessRequest | IFailRequest) => {
          this.loadingService.stop();
          return value;
        })
      );
  }

  updateUserEmail(userId: string, email: string | null | undefined) {
    if (!email) {
      return of({
        success: true,
      } as ISuccessRequest);
    }
    this.loadingService.start();
    return this.http
      .post<ISuccessRequest | IFailRequest>(
        `${environment.mycanaryBackendApi}/profile/${userId}/email`,
        {
          email,
        },
        {
          headers: {
            Authorization: this.authenticateService.accessToken,
          },
        }
      )
      .pipe(networkError(this.router))
      .pipe(
        map((value: ISuccessRequest | IFailRequest) => {
          this.loadingService.stop();
          return value;
        })
      );
  }

  updateUserPassword(userId: string, password: string | null | undefined) {
    if (!password) {
      return of({
        success: true,
      } as ISuccessRequest);
    }
    this.loadingService.start();
    return this.http
      .post<ISuccessRequest | IFailRequest>(
        `${environment.mycanaryBackendApi}/profile/${userId}/password`,
        {
          newPassword: password,
        },
        {
          headers: {
            Authorization: this.authenticateService.accessToken,
          },
        }
      )
      .pipe(networkError(this.router))
      .pipe(
        map((value: ISuccessRequest | IFailRequest) => {
          this.loadingService.stop();
          return value;
        })
      );
  }

  updateUserNotificationSettings(
    userId: string,
    notificationChannel: string,
    notificationFrequency: string
  ) {
    this.loadingService.start();
    return this.http
      .post<ISuccessRequest | IFailRequest>(
        `${environment.mycanaryBackendApi}/profile/${userId}/notification-settings`,
        {
          notificationChannel,
          notificationFrequency,
        },
        {
          headers: {
            Authorization: this.authenticateService.accessToken,
          },
        }
      )
      .pipe(networkError(this.router))
      .pipe(
        map((value: ISuccessRequest | IFailRequest) => {
          this.loadingService.stop();
          return value;
        })
      );
  }
}
