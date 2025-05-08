import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { AutoUnsubscribeComponent } from 'src/app/components/auto-unsubscribe/auto-unsubscribe.component';
import { IFailRequest } from 'src/app/interfaces/backendResponse/IFailRequest';
import {
  emptyIResponseProperty,
  IFetchPropertySuccess,
  IResponseProperty,
} from 'src/app/interfaces/backendResponse/IResponseProperty';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { PlanService } from 'src/app/services/plan.service';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-view-property',
  templateUrl: './view-property.component.html',
  styleUrls: ['./view-property.component.scss'],
  host: {
    '[class.isAdmin]': 'isAdmin',
  },
})
export class ViewPropertyComponent
  extends AutoUnsubscribeComponent
  implements OnInit
{
  title = 'Property Details';
  isAdmin = false;
  propertyId: string = '';
  propertyData: IResponseProperty = _.cloneDeep(emptyIResponseProperty);

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public authenticateService: AuthenticateService,
    public propertyService: PropertyService,
    public planService: PlanService,
    private _snackBar: MatSnackBar
  ) {
    super();
  }

  ngOnInit(): void {
    this.addSubscriptions(
      this.route.paramMap.subscribe((paramMap) => {
        this.propertyId = paramMap.get('id') as string;
      })
    );
    this.isAdmin = this.authenticateService.role === 'ADMIN';
    if (this.propertyId) {
      this.addSubscriptions(
        this.planService.fetchPlans().subscribe(() => {
          this.addSubscriptions(
            this.propertyService
              .fetchPropertyInfo(this.propertyId)
              .subscribe((rs) => {
                if (rs.success === false) {
                  const failResponse = rs as IFailRequest;
                  this._snackBar.open(failResponse.message, 'CLOSE', {
                    verticalPosition: 'top',
                    panelClass: 'error',
                    duration: 3000,
                  });
                } else {
                  const successResponse = rs as IFetchPropertySuccess;
                  this.propertyData = successResponse.data;
                }
              })
          );
        })
      );
    }
  }

  doEdit(): void {
    this.router.navigate(['/main/property/edit', this.propertyId]);
  }

  selectedTabChange(tabIndex: number) {
    this.title = tabIndex === 0 ? 'Property Details' : 'Evaluation Result';
  }
}
