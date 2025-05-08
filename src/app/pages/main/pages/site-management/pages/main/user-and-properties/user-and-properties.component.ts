import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AutoUnsubscribeComponent } from 'src/app/components/auto-unsubscribe/auto-unsubscribe.component';
import { IFailRequest } from 'src/app/interfaces/backendResponse/IFailRequest';
import { IResponseDashboardAdmin } from 'src/app/interfaces/backendResponse/IResponseDashboardAdmin';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-user-and-properties',
  templateUrl: './user-and-properties.component.html',
  styleUrls: ['./user-and-properties.component.scss'],
})
export class UserAndPropertiesComponent
  extends AutoUnsubscribeComponent
  implements OnInit
{
  kpis = [
    {
      key: 'Active Users',
      value: '0',
    },
    {
      key: 'Active Properties',
      value: '0',
    },
    {
      key: 'Total Evaluations',
      value: '0',
    },
    {
      key: '# of Evaluations',
      value: '0',
    },
    {
      key: 'Total Leads',
      value: '0',
    },
  ];
  constructor(
    private dashboardService: DashboardService,
    private _snackBar: MatSnackBar
  ) {
    super();
  }

  ngOnInit(): void {
    this.addSubscriptions(
      this.dashboardService.fetchDashboardAdmin().subscribe((rs) => {
        if (rs.success === false) {
          const failResponse = rs as IFailRequest;
          this._snackBar.open(failResponse.message, 'CLOSE', {
            verticalPosition: 'top',
            panelClass: 'error',
            duration: 3000,
          });
        } else {
          const data = (rs as IResponseDashboardAdmin).data;
          this.kpis = [
            {
              key: 'Active Users',
              value: `${data.activeUsers}`,
            },
            {
              key: 'Active Properties',
              value: `${data.activeProperties}`,
            },
            {
              key: 'Total Evaluations',
              value: `${data.totalEvaluationsAmount}`,
            },
            {
              key: '# of Evaluations',
              value: `${data.numberOfEvaluations}`,
            },
            {
              key: 'Total Leads',
              value: `${data.totalLeads}`,
            },
          ];
        }
      })
    );
  }
}
