import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as _ from 'lodash';
import { AutoUnsubscribeComponent } from 'src/app/components/auto-unsubscribe/auto-unsubscribe.component';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { IFailRequest } from 'src/app/interfaces/backendResponse/IFailRequest';
import {
  emptyIResponseDashboardRealEstateAgent,
  IResponseDashboardRealEstateAgent,
} from 'src/app/interfaces/backendResponse/IResponseDashboardRealEstateAgent';
import { IFetchPropertiesSuccess } from 'src/app/interfaces/backendResponse/IResponseProperty';
import { IProperty } from 'src/app/interfaces/IProperty';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ProfileSettingsService } from 'src/app/services/profile-settings.service';
import { PropertyService } from 'src/app/services/property.service';
import { nFormatter } from 'src/app/utils/string';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent
  extends AutoUnsubscribeComponent
  implements OnInit
{
  kpis = [
    {
      key: 'Active Properties',
      value: '0',
    },
    {
      key: 'Average Spread',
      value: '0',
    },
    {
      key: 'Total Amount',
      value: '0',
    },
    {
      key: 'Total Leads',
      value: '0',
    },
    {
      key: 'Total Views',
      value: '0',
    },
    {
      key: 'Campaigns',
      value: '0',
    },
  ];
  propertyList: IProperty[] = [];
  firstName = '';
  dashboardRealEstateAgent?: IResponseDashboardRealEstateAgent;

  constructor(
    public propertyService: PropertyService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    public profileSettingsService: ProfileSettingsService,
    public dashboardService: DashboardService
  ) {
    super();
  }

  ngOnInit(): void {
    this.addSubscriptions(
      this.profileSettingsService.isRealEstateAgent.subscribe(
        (isRealEstateAgent) => {
          if (isRealEstateAgent === null) {
            return;
          }
          this.addSubscriptions(
            (isRealEstateAgent
              ? this.propertyService.fetchProperties(
                  this.profileSettingsService.personalInfo.value.data._id
                )
              : this.propertyService.fetchProperties()
            ).subscribe((rs) => {
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

          if (isRealEstateAgent) {
            this.addSubscriptions(
              this.dashboardService
                .fetchDashboardRealEstateAgent()
                .subscribe((rs) => {
                  if (rs.success === false) {
                    const failResponse = rs as IFailRequest;
                    this._snackBar.open(failResponse.message, 'CLOSE', {
                      verticalPosition: 'top',
                      panelClass: 'error',
                      duration: 3000,
                    });
                  } else {
                    const successResponse =
                      rs as IResponseDashboardRealEstateAgent;
                    this.dashboardRealEstateAgent = successResponse;
                    this.updateDashboardRealEstateAgent();
                  }
                })
            );
          }
        }
      )
    );

    this.addSubscriptions(
      this.profileSettingsService.personalInfo.subscribe((rs) => {
        this.firstName = rs.data.firstName;
      })
    );
  }

  updateDashboardRealEstateAgent() {
    if (this.dashboardRealEstateAgent) {
      this.kpis = [
        {
          key: 'Active Properties',
          value: `${this.dashboardRealEstateAgent.data.activeProperties}`,
        },
        {
          key: 'Total Amount',
          value: `$${nFormatter(
            this.dashboardRealEstateAgent.data.totalAmount
          )}`,
        },
        {
          key: 'Total Leads',
          value: `${this.dashboardRealEstateAgent.data.totalLeads}`,
        },
        {
          key: 'Total Views',
          value: `${this.dashboardRealEstateAgent.data.totalViews}`,
        },
        {
          key: 'Campaigns',
          value: `${this.dashboardRealEstateAgent.data.campaigns}`,
        },
      ];
    }
  }

  removeData(id: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '584px',
      maxWidth: 'calc(100vw - 20px)',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addSubscriptions(
          this.propertyService.deleteProperties(id).subscribe((rs) => {
            if (rs.success === false) {
              const failResponse = rs as IFailRequest;
              this._snackBar.open(failResponse.message, 'CLOSE', {
                verticalPosition: 'top',
                panelClass: 'error',
                duration: 3000,
              });
            } else {
              const itemIndex = _.findIndex(this.propertyList, {
                id,
              });
              this.propertyList.splice(itemIndex, 1);
              this.propertyList = [...this.propertyList];
            }
          })
        );
      }
    });
  }
}
