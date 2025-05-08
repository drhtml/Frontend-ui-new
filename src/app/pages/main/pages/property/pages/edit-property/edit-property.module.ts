import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditPropertyComponent } from './edit-property.component';
import { EditPropertyRoutingModule } from './edit-property-routing.module';
import { ButtonModule } from 'src/app/components/button/button.module';
import { DeleteThisPropertyRightModule } from 'src/app/components/delete-this-property-right/delete-this-property-right.module';
import { StepEditReviewFormModule } from 'src/app/components/step-edit-review-form/step-edit-review-form.module';
import { BottomLinksModule } from 'src/app/components/bottom-links/bottom-links.module';

@NgModule({
  declarations: [EditPropertyComponent],
  imports: [
    CommonModule,
    EditPropertyRoutingModule,
    ButtonModule,
    DeleteThisPropertyRightModule,
    StepEditReviewFormModule,
    BottomLinksModule,
  ],
})
export class EditPropertyModule {}
