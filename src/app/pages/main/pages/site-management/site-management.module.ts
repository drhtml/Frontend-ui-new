import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteManagementComponent } from './site-management.component';
import { SiteManagementRoutingModule } from './site-management-routing.module';

@NgModule({
  declarations: [SiteManagementComponent],
  imports: [CommonModule, SiteManagementRoutingModule],
})
export class SiteManagementModule {}
