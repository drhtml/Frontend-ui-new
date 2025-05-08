import { Router } from '@angular/router';
import * as _ from 'lodash';
import { catchError, of } from 'rxjs';

export const networkError = (router: Router) =>
  catchError<any, any>((err) => {
    const errorMessage = _.get(err, 'error.message');
    if (err.status === 401) {
      setTimeout(() => {
        router.navigate(['/menu/login']);
      }, 2000);
      if (errorMessage.indexOf('jwt expired') >= 0) {
        return of({
          message: 'Your session has timed out',
          success: false,
        });
      }
    }
    return of({
      message: errorMessage || 'Network error',
      success: false,
    });
  });
