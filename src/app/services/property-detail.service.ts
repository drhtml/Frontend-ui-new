import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPropertyDetail } from '../interfaces/IPropertyDetail';
import { ISchoolDetailResponse } from '../interfaces/ISchoolDetailResponse';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class PropertyDetailService {
  constructor(
    private http: HttpClient,
    private loadingService: LoadingService
  ) {}

  fetchDetail(address: string): Observable<IPropertyDetail | null> {
    this.loadingService.start();
    return this.http
      .get<IPropertyDetail>(`${environment.backendApi}/propertydetail`, {
        params: {
          address,
        },
      })
      .pipe(catchError((err) => of(null)))
      .pipe(
        tap(() => {
          this.loadingService.stop();
        })
      );
  }
}
