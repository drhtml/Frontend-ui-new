import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { LOCAL_STORAGE_LOGIN_USER_INFO } from 'src/constant';
import { environment } from 'src/environments/environment';
import { IResponseLogin } from '../interfaces/backendResponse/IResponseLogin';
import {
  emptyILoginUserInfo,
  ILoginUserInfo,
} from '../interfaces/ILoginUserInfo';
import { IUserRole } from '../interfaces/IUserRole';
import { LoadingService } from './loading.service';
import jwt_decode from 'jwt-decode';
import { networkError } from '../utils/network';
import { IFailRequest } from '../interfaces/backendResponse/IFailRequest';
import * as _ from 'lodash';
import { IResponseProfileType } from '../interfaces/backendResponse/IResponsePersonalInfo';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  loginUserInfo: ILoginUserInfo = emptyILoginUserInfo;

  constructor(
    private router: Router,
    private http: HttpClient,
    private loadingService: LoadingService
  ) {
    if (localStorage.getItem(LOCAL_STORAGE_LOGIN_USER_INFO)) {
      this.loginUserInfo = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_LOGIN_USER_INFO) || ''
      );
    }
  }

  get role(): IUserRole {
    return _.get(this.loginUserInfo, 'role', 'UNVERIFIED');
  }

  get accessToken(): string {
    return `Bearer ${_.get(this.loginUserInfo, 'accessToken', '')}`;
  }

  login(loginObject: { email: string; password: string }) {
    this.loadingService.start();
    return this.http
      .post<IResponseLogin | IFailRequest>(
        `${environment.mycanaryBackendApi}/auth/login`,
        loginObject
      )
      .pipe(networkError(this.router))
      .pipe(
        map((value: IResponseLogin | IFailRequest) => {
          this.loadingService.stop();
          if (value.success !== false) {
            const successResponse = value as IResponseLogin;
            try {
              this.loginUserInfo = jwt_decode(
                successResponse.accessToken || ''
              );
              this.loginUserInfo.accessToken =
                successResponse.accessToken || '';
              localStorage.setItem(
                LOCAL_STORAGE_LOGIN_USER_INFO,
                JSON.stringify(this.loginUserInfo)
              );
            } catch (Error) {}

            return this.loginUserInfo;
          }
          return {
            ...emptyILoginUserInfo,
            ...value,
          };
        })
      );
  }

  signup(signupObject: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    type: string;
    realEstateAgentLicense?: string;
  }) {
    this.loadingService.start();
    return this.http
      .post<ILoginUserInfo>(
        `${environment.mycanaryBackendApi}/auth/register`,
        signupObject
      )
      .pipe(networkError(this.router))
      .pipe(
        tap(() => {
          this.loadingService.stop();
        })
      );
  }
}
