import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileSettingsComponent } from './profile-settings.component';
import { ProfileSettingsRoutingModule } from './profile-settings-routing.module';
import { SettingsWrapperComponent } from './components/settings-wrapper/settings-wrapper.component';
import { MatTabsModule } from '@angular/material/tabs';
import { BottomLinksModule } from 'src/app/components/bottom-links/bottom-links.module';
import { EditPersonalInfoComponent } from './components/edit-personal-info/edit-personal-info.component';
import { EditAccountSettingsComponent } from './components/edit-account-settings/edit-account-settings.component';
import { EditNotificationsSettingsComponent } from './components/edit-notifications-settings/edit-notifications-settings.component';
import { ButtonModule } from 'src/app/components/button/button.module';
import { DividerModule } from 'src/app/components/divider/divider.module';
import { InputFieldModule } from 'src/app/components/input-field/input-field.module';
import { RadiosModule } from 'src/app/components/radios/radios.module';
import { SelectFieldModule } from 'src/app/components/select-field/select-field.module';

@NgModule({
  declarations: [
    ProfileSettingsComponent,
    SettingsWrapperComponent,
    EditPersonalInfoComponent,
    EditAccountSettingsComponent,
    EditNotificationsSettingsComponent,
  ],
  imports: [
    CommonModule,
    ProfileSettingsRoutingModule,
    MatTabsModule,
    BottomLinksModule,
    ButtonModule,
    DividerModule,
    InputFieldModule,
    RadiosModule,
    SelectFieldModule,
  ],
})
export class ProfileSettingsModule {}
