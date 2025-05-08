import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { BottomLinksModule } from 'src/app/components/bottom-links/bottom-links.module';
import { MatTabsModule } from '@angular/material/tabs';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { ProfilePropertiesComponent } from './profile-properties/profile-properties.component';
import { ProfileWrapperComponent } from './profile-wrapper/profile-wrapper.component';
import { RadiosModule } from 'src/app/components/radios/radios.module';
import { ButtonModule } from 'src/app/components/button/button.module';
import { InputFieldModule } from 'src/app/components/input-field/input-field.module';
import { DividerModule } from 'src/app/components/divider/divider.module';
import { SelectFieldModule } from 'src/app/components/select-field/select-field.module';
import { ViewAsToggleModule } from 'src/app/components/view-as-toggle/view-as-toggle.module';
import { PropertiesGridViewComponent } from './profile-properties/properties-grid-view/properties-grid-view.component';
import { PropertiesTableViewComponent } from './profile-properties/properties-table-view/properties-table-view.component';
import { EvaluationStatusModule } from 'src/app/components/evaluation-status/evaluation-status.module';
import { TableModule } from 'src/app/components/table/table.module';

@NgModule({
  declarations: [
    UserProfileComponent,
    ProfileSettingsComponent,
    ProfilePropertiesComponent,
    ProfileWrapperComponent,
    PropertiesGridViewComponent,
    PropertiesTableViewComponent,
  ],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    BottomLinksModule,
    MatTabsModule,
    RadiosModule,
    ButtonModule,
    InputFieldModule,
    DividerModule,
    SelectFieldModule,
    ViewAsToggleModule,
    EvaluationStatusModule,
    TableModule,
  ],
})
export class UserProfileModule {}
