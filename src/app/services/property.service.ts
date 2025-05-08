import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { forkJoin, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IFailRequest } from '../interfaces/backendResponse/IFailRequest';
import { IRequestProperty } from '../interfaces/backendResponse/IRequestProperty';
import { IRequestUpdateProperty } from '../interfaces/backendResponse/IRequestUpdateProperty';
import {
  IResponsePhoto,
  IResponsePhotoSuccess,
} from '../interfaces/backendResponse/IResponsePhoto';
import { IResponsePlan } from '../interfaces/backendResponse/IResponsePlan';
import {
  convertFromResponsePropertyToUIProperty,
  IResponseSuccess,
  IFetchPropertiesSuccess,
  IFetchPropertySuccess,
  IResponseProperty,
} from '../interfaces/backendResponse/IResponseProperty';
import { IFileFormField } from '../interfaces/IFormFieldType';
import { networkError } from '../utils/network';
import {
  getFileNameWithExtension,
  getFileNameWithoutExtension,
} from '../utils/string';
import { AuthenticateService } from './authenticate.service';
import { LoadingService } from './loading.service';
import { ProfileSettingsService } from './profile-settings.service';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  constructor(
    private router: Router,
    private http: HttpClient,
    private loadingService: LoadingService,
    private authenticateService: AuthenticateService,
    private profileSettingsService: ProfileSettingsService
  ) {}

  fetchProperties(userId?: string) {
    type responseType = {
      success: boolean;
      data: IResponseProperty[];
    };

    const loginUserInfoId = this.profileSettingsService.personalInfo.value.data._id;

    let api = `${environment.mycanaryBackendApi}/properties`;
    if (userId && userId === loginUserInfoId) {
      api = `${environment.mycanaryBackendApi}/properties/owned`;
    } else if (userId) {
      api = `${environment.mycanaryBackendApi}/user/${userId}/properties`;
    }

    this.loadingService.start();
    return this.http
      .get<responseType | IFailRequest>(api, {
        headers: {
          Authorization: this.authenticateService.accessToken,
        },
      })
      .pipe(networkError(this.router))
      .pipe(
        map((value: responseType | IFailRequest) => {
          this.loadingService.stop();
          if (value.success !== false) {
            const successResponse = value as responseType;

            return {
              success: successResponse.success,
              items: successResponse.data.map((item) => {
                return {
                  ...item,
                  ...convertFromResponsePropertyToUIProperty(item),
                };
              }),
            } as IFetchPropertiesSuccess;
          }
          return value as IFailRequest;
        })
      );
  }

  fetchPropertyInfo(id: string) {
    this.loadingService.start();
    return forkJoin(
      // as of RxJS 6.5+ we can use a dictionary of sources
      {
        propertyInfo: this.http
          .get<IFetchPropertySuccess | IFailRequest>(
            `${environment.mycanaryBackendApi}/property/${id}`,
            {
              headers: {
                Authorization: this.authenticateService.accessToken,
              },
            }
          )
          .pipe(networkError(this.router)),
        photos: this.http
          .get<IResponsePhotoSuccess[] | IFailRequest>(
            `${environment.mycanaryBackendApi}/property/${id}/images`,
            {
              headers: {
                Authorization: this.authenticateService.accessToken,
              },
            }
          )
          .pipe(networkError(this.router)),
      }
    ).pipe(
      map(
        (value: {
          propertyInfo: IFetchPropertySuccess | IFailRequest;
          photos: IResponsePhotoSuccess | IFailRequest;
        }) => {
          this.loadingService.stop();
          if (value.propertyInfo.success === false) {
            const failResponse = value.propertyInfo as IFailRequest;

            return failResponse;
          }
          if (value.photos.success === false) {
            const failResponse = value.photos as IFailRequest;

            return failResponse;
          }

          const propertyInfo = value.propertyInfo as IFetchPropertySuccess;
          const photos = value.photos as IResponsePhotoSuccess;
          propertyInfo.data.photos = photos.data.map((photo) => {
            return {
              ...photo,
              name: getFileNameWithoutExtension(photo.fileName),
              nameWithExtension: getFileNameWithExtension(photo.fileName),
            };
          });
          return propertyInfo;
        }
      )
    );
  }

  fetchPhotos(id: string) {
    this.loadingService.start();
    return this.http
      .get<IResponsePhotoSuccess[] | IFailRequest>(
        `${environment.mycanaryBackendApi}/property/${id}`,
        {
          headers: {
            Authorization: this.authenticateService.accessToken,
          },
        }
      )
      .pipe(networkError(this.router))
      .pipe(
        map((value: IFetchPropertySuccess | IFailRequest) => {
          this.loadingService.stop();
          if (value.success !== false) {
            const successResponse = value as IFetchPropertySuccess;

            return successResponse;
          }
          return value as IFailRequest;
        })
      );
  }

  newProperties(data: IRequestProperty) {
    this.loadingService.start();
    return this.http
      .post<IFetchPropertySuccess | IFailRequest>(
        `${environment.mycanaryBackendApi}/property`,
        data,
        {
          headers: {
            Authorization: this.authenticateService.accessToken,
          },
        }
      )
      .pipe(networkError(this.router))
      .pipe(
        map((value: IFetchPropertySuccess | IFailRequest) => {
          this.loadingService.stop();
          if (value.success !== false) {
            const successResponse = value as IFetchPropertySuccess;

            return successResponse;
          }
          return value as IFailRequest;
        })
      );
  }

  updateProperties(propertyId: string, data: IRequestUpdateProperty) {
    this.loadingService.start();
    return this.http
      .patch<IFetchPropertySuccess | IFailRequest>(
        `${environment.mycanaryBackendApi}/property/${propertyId}`,
        data,
        {
          headers: {
            Authorization: this.authenticateService.accessToken,
          },
        }
      )
      .pipe(networkError(this.router))
      .pipe(
        map((value: IFetchPropertySuccess | IFailRequest) => {
          this.loadingService.stop();
          if (value.success !== false) {
            const successResponse = value as IFetchPropertySuccess;

            return successResponse;
          }
          return value as IFailRequest;
        })
      );
  }

  selectPlan(propertyId: string, plan?: IResponsePlan) {
    if (!plan) {
      return Promise.resolve({
        success: true,
      });
    }
    this.loadingService.start();
    return this.http
      .post<IFetchPropertySuccess | IFailRequest>(
        `${environment.mycanaryBackendApi}//property/${propertyId}/plan/${plan._id}/apply`,
        {
          price: plan.costPerYear,
        },
        {
          headers: {
            Authorization: this.authenticateService.accessToken,
          },
        }
      )
      .pipe(networkError(this.router))
      .pipe(
        map((value: IFetchPropertySuccess | IFailRequest) => {
          this.loadingService.stop();
          if (value.success !== false) {
            const successResponse = value as IFetchPropertySuccess;

            return successResponse;
          }
          return value as IFailRequest;
        })
      );
  }

  deleteProperties(propertyId: string) {
    this.loadingService.start();
    return this.http
      .delete<IResponseSuccess | IFailRequest>(
        `${environment.mycanaryBackendApi}/property/${propertyId}`,
        {
          headers: {
            Authorization: this.authenticateService.accessToken,
          },
        }
      )
      .pipe(networkError(this.router))
      .pipe(
        map((value: IResponseSuccess | IFailRequest) => {
          this.loadingService.stop();
          if (value.success !== false) {
            const successResponse = value as IResponseSuccess;

            return successResponse;
          }
          return value as IFailRequest;
        })
      );
  }

  uploadPhotoImages(propertyId: string, photos: IFileFormField[]) {
    if (photos.length === 0) {
      return of([] as IResponsePhoto[]);
    }
    const formData = new FormData();
    _.forEach(photos, (photo) => {
      if (photo.file) {
        formData.append('house', photo.file);
      }
    });

    this.loadingService.start();
    return this.http
      .post<IResponsePhoto[] | IFailRequest>(
        `${environment.mycanaryBackendApi}/property/${propertyId}/images`,
        formData,
        {
          params: {
            append: true,
          },
          headers: {
            Authorization: this.authenticateService.accessToken,
          },
        }
      )
      .pipe(networkError(this.router))
      .pipe(
        map((value: IResponsePhoto[] | IFailRequest) => {
          this.loadingService.stop();
          const failRequest = value as IFailRequest;
          if (failRequest.success === false) {
            return value as IFailRequest;
          }
          const successResponse = value as IResponsePhoto[];

          return successResponse;
        })
      );
  }

  deletePhotos(propertyId: string, photos: IResponsePhoto[]) {
    if (photos.length === 0) {
      return of({
        success: true,
      });
    }

    this.loadingService.start();
    return this.http
      .delete<IResponseSuccess | IFailRequest>(
        `${environment.mycanaryBackendApi}/property/${propertyId}/image`,
        {
          headers: {
            Authorization: this.authenticateService.accessToken,
          },
          body: photos.map((p) => p._id),
        }
      )
      .pipe(networkError(this.router))
      .pipe(
        map((value: IResponseSuccess | IFailRequest) => {
          this.loadingService.stop();
          if (value.success !== false) {
            const successResponse = value as IResponseSuccess;

            return successResponse;
          }
          return value as IFailRequest;
        })
      );
  }
}
