import { Component, Input, OnChanges, OnInit } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';
import { IResponseDashboardRealEstateAgent } from 'src/app/interfaces/backendResponse/IResponseDashboardRealEstateAgent';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { ProfileSettingsService } from 'src/app/services/profile-settings.service';
import { AutoUnsubscribeComponent } from '../auto-unsubscribe/auto-unsubscribe.component';
import { ILineChartByMonthData } from '../line-chart-by-month/line-chart-by-month.component';
import { getRandomColor, IPieData } from '../pie-chart/pie-chart.component';

@Component({
  selector: 'app-dashboard-bottom-statistic',
  templateUrl: './dashboard-bottom-statistic.component.html',
  styleUrls: ['./dashboard-bottom-statistic.component.scss'],
})
export class DashboardBottomStatisticComponent
  extends AutoUnsubscribeComponent
  implements OnInit, OnChanges
{
  isRealEstateAgent = false;
  isCanary = false;
  @Input() dashboardRealEstateAgent?: IResponseDashboardRealEstateAgent;
  topSourceCityDatas: IPieData[] = [];
  averageVisitPerPriceDatas: ILineChartByMonthData[] = [];

  constructor(public profileSettingsService: ProfileSettingsService) {
    super();

    this.addSubscriptions(
      this.profileSettingsService.isRealEstateAgent.subscribe(
        (isRealEstateAgent) => {
          if (isRealEstateAgent !== null) {
            this.isRealEstateAgent = isRealEstateAgent;
          }
        }
      )
    );
    this.addSubscriptions(
      this.profileSettingsService.isCanary.subscribe((isCanary) => {
        if (isCanary !== null) {
          this.isCanary = isCanary;
        }
      })
    );
  }

  ngOnInit(): void {}

  public ngOnChanges(changes: any): void {
    if (
      changes.hasOwnProperty('dashboardRealEstateAgent') &&
      this.dashboardRealEstateAgent
    ) {
      const totalValue =
        _.reduce(
          this.dashboardRealEstateAgent.data.topFiveSourceCities,
          (value, item) => {
            return value + item.count;
          },
          0
        ) || 1;
      this.topSourceCityDatas =
        this.dashboardRealEstateAgent.data.topFiveSourceCities.map(
          (top, index) => ({
            name: top._id,
            value: `${Math.round((top.count * 1.0 * 100) / totalValue)}`,
            color: getRandomColor(index),
          })
        );

      const bkData: { [key: string]: number } = {};

      const lineChartDatas: ILineChartByMonthData[] = [];
      _.forEach(
        this.dashboardRealEstateAgent.data.averageVisitsPerPricePoint,
        (pricePoint) => {
          _.forEach(pricePoint.timestamps, (timestamp) => {
            const momentDate = moment(timestamp);
            const dataKey = momentDate.format('YYYY-MMM');
            const firstDateOfMonth = momentDate.startOf('month');

            if (!bkData[dataKey]) {
              bkData[dataKey] = pricePoint.count;
            } else {
              bkData[dataKey] += pricePoint.count;
            }

            const matchData = _.find(lineChartDatas, {
              key: dataKey,
            });
            if (matchData) {
              matchData.value = bkData[dataKey];
            } else {
              lineChartDatas.push({
                value: bkData[dataKey],
                date: firstDateOfMonth.toDate(),
                key: dataKey,
              });
            }
          });
        }
      );

      this.averageVisitPerPriceDatas = _.orderBy(
        lineChartDatas,
        ['date'],
        ['asc']
      );
    }
  }
}
