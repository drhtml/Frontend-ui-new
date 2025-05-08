import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IFailRequest } from '../interfaces/backendResponse/IFailRequest';
import {
  IRequestAddPlan,
  IRequestUpdatePlan,
} from '../interfaces/backendResponse/IRequestUpdatePlan';
import {
  IFetchPlansSuccess,
  IResponsePlan,
} from '../interfaces/backendResponse/IResponsePlan';
import { ISuccessRequest } from '../interfaces/backendResponse/ISuccessRequest';
import { networkError } from '../utils/network';
import { AuthenticateService } from './authenticate.service';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class PlanService {
  allPlans = new BehaviorSubject<IResponsePlan[]>([]);

  constructor(
    private router: Router,
    private http: HttpClient,
    private loadingService: LoadingService,
    private authenticateService: AuthenticateService
  ) {}

  fetchPlans() {
    this.loadingService.start();
    return this.http
      .get<IFetchPlansSuccess | IFailRequest>(
        `${environment.mycanaryBackendApi}/plans`,
        {
          headers: {
            Authorization: this.authenticateService.accessToken,
          },
        }
      )
      .pipe(networkError(this.router))
      .pipe(
        tap((value) => {
          if (value.success) {
            this.allPlans.next(value.data);
          }
          this.loadingService.stop();
        })
      );
  }

  updatePlans(plans: (IRequestUpdatePlan | IRequestAddPlan)[]) {
    if (plans.length === 0) {
      return of({
        success: true,
      });
    }

    this.loadingService.start();
    return this.http
      .put<ISuccessRequest | IFailRequest>(
        `${environment.mycanaryBackendApi}/plans`,
        plans,
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

  deletePlans(plans: IResponsePlan[]) {
    if (plans.length === 0) {
      return of({
        success: true,
      });
    }

    this.loadingService.start();
    return this.http
      .delete<ISuccessRequest | IFailRequest>(
        `${environment.mycanaryBackendApi}/plans`,
        {
          headers: {
            Authorization: this.authenticateService.accessToken,
          },
          body: plans.map((p) => p._id),
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
