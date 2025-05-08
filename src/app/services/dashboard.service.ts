import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IFailRequest } from '../interfaces/backendResponse/IFailRequest';
import { IResponseDashboardAdmin } from '../interfaces/backendResponse/IResponseDashboardAdmin';
import { IResponseDashboardRealEstateAgent } from '../interfaces/backendResponse/IResponseDashboardRealEstateAgent';
import { networkError } from '../utils/network';
import { AuthenticateService } from './authenticate.service';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(
    private router: Router,
    private http: HttpClient,
    private loadingService: LoadingService,
    private authenticateService: AuthenticateService
  ) {}

  fetchDashboardAdmin() {
    this.loadingService.start();
    return this.http
      .get<IResponseDashboardAdmin | IFailRequest>(
        `${environment.mycanaryBackendApi}/dashboard/admin`,
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

  fetchDashboardRealEstateAgent() {
    this.loadingService.start();
    return this.http
      .get<IResponseDashboardRealEstateAgent | IFailRequest>(
        `${environment.mycanaryBackendApi}/dashboard/real-estate-agent`,
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
}
