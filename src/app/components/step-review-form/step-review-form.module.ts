import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepReviewFormComponent } from './step-review-form.component';
import { ReviewEvaluationsComponent } from './components/review-evaluations/review-evaluations.component';
import { ReviewPropertyDetailsComponent } from './components/review-property-details/review-property-details.component';
import { ReviewEnergyDetailsComponent } from './components/review-property-details/components/review-energy-details/review-energy-details.component';
import { ReviewFieldSectionComponent } from './components/review-property-details/components/review-field-section/review-field-section.component';
import { ReviewFloorPlansComponent } from './components/review-property-details/components/review-floor-plans/review-floor-plans.component';
import { ReviewInteriorDetailsComponent } from './components/review-property-details/components/review-interior-details/review-interior-details.component';
import { ReviewPriceEvolutionComponent } from './components/review-property-details/components/review-price-evolution/review-price-evolution.component';
import { ReviewPropertyHeaderComponent } from './components/review-property-details/components/review-property-header/review-property-header.component';
import { ReviewPropertySubDetailsComponent } from './components/review-property-details/components/review-property-sub-details/review-property-sub-details.component';
import { ReviewRecentImprovementsComponent } from './components/review-property-details/components/review-recent-improvements/review-recent-improvements.component';
import { ReviewRecentTickerComponent } from './components/review-property-details/components/review-recent-ticker/review-recent-ticker.component';
import { ReviewSchoolsComponent } from './components/review-property-details/components/review-schools/review-schools.component';
import { EvaluationSliderModule } from '../evaluation-slider/evaluation-slider.module';
import { ButtonModule } from '../button/button.module';
import { LineChartModule } from '../line-chart/line-chart.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { DividerModule } from '../divider/divider.module';
import { MonthlyPaymentModule } from '../monthly-payment/monthly-payment.module';
import { MatTabsModule } from '@angular/material/tabs';
import { OwnerPopoverRightModule } from '../owner-popover-right/owner-popover-right.module';
import { ReviewPlanComponent } from './components/review-property-details/components/review-plan/review-plan.component';
import { PlanCardModule } from '../plan-card/plan-card.module';
import { PricePointsSummaryRightModule } from '../price-points-summary-right/price-points-summary-right.module';
import { PricePointContainerComponent } from './components/review-evaluations/price-point-container/price-point-container.component';
import { ViewAsToggleModule } from '../view-as-toggle/view-as-toggle.module';
import { SelectFieldModule } from '../select-field/select-field.module';
import { PricePointListComponent } from './components/review-evaluations/price-point-container/price-point-list/price-point-list.component';
import { PricePointChartComponent } from './components/review-evaluations/price-point-container/price-point-chart/price-point-chart.component';
import { TableModule } from '../table/table.module';
import { PricePointGridComponent } from './components/review-evaluations/price-point-container/price-point-list/price-point-grid/price-point-grid.component';
import { CellEvaluationStatusModule } from '../cell-evaluation-status/cell-evaluation-status.module';
import { PricePointsSummaryDialogModule } from '../price-points-summary-dialog/price-points-summary-dialog.module';
import { SwiperModule } from 'swiper/angular';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    StepReviewFormComponent,
    ReviewPropertyDetailsComponent,
    ReviewEvaluationsComponent,
    ReviewPropertyHeaderComponent,
    ReviewFloorPlansComponent,
    ReviewInteriorDetailsComponent,
    ReviewPropertySubDetailsComponent,
    ReviewRecentImprovementsComponent,
    ReviewSchoolsComponent,
    ReviewPriceEvolutionComponent,
    ReviewEnergyDetailsComponent,
    ReviewFieldSectionComponent,
    ReviewRecentTickerComponent,
    ReviewPlanComponent,
    PricePointContainerComponent,
    PricePointListComponent,
    PricePointChartComponent,
    PricePointGridComponent,
  ],
  exports: [StepReviewFormComponent],
  imports: [
    CommonModule,
    EvaluationSliderModule,
    ButtonModule,
    LineChartModule,
    MatExpansionModule,
    DividerModule,
    MonthlyPaymentModule,
    MatTabsModule,
    OwnerPopoverRightModule,
    PlanCardModule,
    PricePointsSummaryRightModule,
    ViewAsToggleModule,
    SelectFieldModule,
    TableModule,
    CellEvaluationStatusModule,
    PricePointsSummaryDialogModule,
    SwiperModule,
    MatProgressSpinnerModule,
  ],
})
export class StepReviewFormModule {}
