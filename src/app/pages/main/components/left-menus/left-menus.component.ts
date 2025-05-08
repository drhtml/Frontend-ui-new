import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { IUserRole } from 'src/app/interfaces/IUserRole';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { AutoUnsubscribeComponent } from 'src/app/components/auto-unsubscribe/auto-unsubscribe.component';
import { ProfileSettingsService } from 'src/app/services/profile-settings.service';

@Component({
  selector: 'app-left-menus',
  templateUrl: './left-menus.component.html',
  styleUrls: ['./left-menus.component.scss'],
})
export class LeftMenusComponent
  extends AutoUnsubscribeComponent
  implements OnInit
{
  userRole: IUserRole = '';
  currentUrl: string = '';
  isSiteManagementUserProfile: boolean = false;
  avatarUrl: string = '';

  constructor(
    public authenticateService: AuthenticateService,
    public profileSettingsService: ProfileSettingsService,
    location: Location,
    router: Router
  ) {
    super();

    router.events.subscribe((val) => {
      this.currentUrl = location.path();
      this.isSiteManagementUserProfile =
        this.currentUrl.indexOf('/main/site-management/user-profile') >= 0;
    });
  }

  ngOnInit(): void {
    this.userRole = this.authenticateService.role;

    this.addSubscriptions(
      this.profileSettingsService.personalInfo.subscribe((rs) => {
        this.avatarUrl = rs.data.profilePicture.url;
      })
    );
  }

  get isAdmin(): boolean {
    return this.userRole === 'ADMIN';
  }
}
