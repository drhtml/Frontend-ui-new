import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { BehaviorSubject, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IFailRequest } from '../interfaces/backendResponse/IFailRequest';
import { IRequestPersonalInfo } from '../interfaces/backendResponse/IRequestPersonalInfo';
import {
  IResponseNotificationChannel,
  IResponseNotificationFrequency,
  IResponseNotificationSettings,
} from '../interfaces/backendResponse/IResponseNotificationSettings';
import {
  emptyIResponsePersonalInfo,
  IResponsePersonalInfo,
} from '../interfaces/backendResponse/IResponsePersonalInfo';
import { IResponseSuccess } from '../interfaces/backendResponse/IResponseProperty';
import { IFileFormField } from '../interfaces/IFormFieldType';
import { IFormPersonalInfo } from '../interfaces/IFormPersonalInfo';
import { networkError } from '../utils/network';
import { AuthenticateService } from './authenticate.service';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileSettingsService {
  personalInfo = new BehaviorSubject<IResponsePersonalInfo>(
    _.cloneDeep(emptyIResponsePersonalInfo)
  );
  isRealEstateAgent = this.personalInfo.pipe(
    map((info) => {
      if (!info.data.type) {
        return null;
      }
      return info.data.type === 'REAL_ESTATE_AGENT';
    })
  );
  isCanary = this.personalInfo.pipe(
    map((info) => {
      if (!info.data.type) {
        return null;
      }
      return info.data.type === 'CANARY';
    })
  );

  constructor(
    private router: Router,
    private http: HttpClient,
    private loadingService: LoadingService,
    private authenticateService: AuthenticateService
  ) {}

  fetchPersonalInfo() {
    this.loadingService.start();
    return this.http
      .get<IResponsePersonalInfo | IFailRequest>(
        `${environment.mycanaryBackendApi}/profile/personal-info`,
        {
          headers: {
            Authorization: this.authenticateService.accessToken,
          },
        }
      )
      .pipe(networkError(this.router))
      .pipe(
        tap((rs: IFailRequest | IResponsePersonalInfo) => {
          this.loadingService.stop();
          if (rs.success !== false) {
            this.personalInfo.next({
              success: true,
              data: {
                ...this.personalInfo.value.data,
                ...(rs as IResponsePersonalInfo).data,
              },
            });
          }
        })
      );
  }

  updatePersonalInfo(data: IRequestPersonalInfo, formData: IFormPersonalInfo) {
    this.loadingService.start();
    return this.http
      .post<IResponsePersonalInfo | IFailRequest>(
        `${environment.mycanaryBackendApi}/profile/personal-info`,
        data,
        {
          headers: {
            Authorization: this.authenticateService.accessToken,
          },
        }
      )
      .pipe(networkError(this.router))
      .pipe(
        tap((rs: IFailRequest) => {
          this.loadingService.stop();
          if (rs.success !== false) {
            this.personalInfo.next({
              success: true,
              data: {
                ...this.personalInfo.value.data,
                ...data,
                profilePicture: {
                  ...this.personalInfo.value.data.profilePicture,
                  url: formData.avatar.url,
                },
              },
            });
          }
        })
      );
  }

  fetchNotificationSettings() {
    this.loadingService.start();
    return this.http
      .get<IResponseNotificationSettings | IFailRequest>(
        `${environment.mycanaryBackendApi}/profile/notification-settings`,
        {
          headers: {
            Authorization: this.authenticateService.accessToken,
          },
        }
      )
      .pipe(networkError(this.router))
      .pipe(
        tap(() => {
          this.loadingService.stop();
        })
      );
  }

  updateNotificationSettings(
    notificationChannel: IResponseNotificationChannel,
    notificationFrequency: IResponseNotificationFrequency
  ) {
    this.loadingService.start();
    return this.http
      .post<IResponsePersonalInfo | IFailRequest>(
        `${environment.mycanaryBackendApi}/profile/notification-settings`,
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
        tap(() => {
          this.loadingService.stop();
        })
      );
  }

  updateEmail(email: string) {
    this.loadingService.start();
    return this.http
      .post<IResponsePersonalInfo | IFailRequest>(
        `${environment.mycanaryBackendApi}/profile/email`,
        { email },
        {
          headers: {
            Authorization: this.authenticateService.accessToken,
          },
        }
      )
      .pipe(networkError(this.router))
      .pipe(
        tap(() => {
          this.loadingService.stop();
        })
      );
  }

  updatePassword(oldPassword: string, newPassword: string) {
    this.loadingService.start();
    return this.http
      .post<IResponsePersonalInfo | IFailRequest>(
        `${environment.mycanaryBackendApi}/profile/password`,
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: this.authenticateService.accessToken,
          },
        }
      )
      .pipe(networkError(this.router))
      .pipe(
        tap(() => {
          this.loadingService.stop();
        })
      );
  }

  uploadProfilePicture(photo: IFileFormField) {
    if (!photo.file) {
      return of({
        success: true,
      });
    }

    this.loadingService.start();

    const formData = new FormData();
    formData.append('profilePicture', photo.file);

    return this.http
      .post<IResponseSuccess | IFailRequest>(
        `${environment.mycanaryBackendApi}/profile/profile-picture`,
        formData,
        {
          headers: {
            Authorization: this.authenticateService.accessToken,
          },
        }
      )
      .pipe(networkError(this.router))
      .pipe(
        tap((rs) => {
          this.loadingService.stop();

          if (rs.success !== false) {
            this.personalInfo.next({
              success: true,
              data: {
                ...this.personalInfo.value.data,
                profilePicture: {
                  ...this.personalInfo.value.data.profilePicture,
                  url: photo.url,
                },
              },
            });
          }
        })
      );
  }
}
