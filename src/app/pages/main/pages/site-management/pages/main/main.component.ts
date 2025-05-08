import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoUnsubscribeComponent } from 'src/app/components/auto-unsubscribe/auto-unsubscribe.component';
import { IScreenSize } from 'src/app/interfaces/IScreenSize';
import { ProfileSettingsService } from 'src/app/services/profile-settings.service';
import { WIDTH_MOBILE_MAX, WIDTH_TABLET_MAX } from 'src/app/utils/responsive';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  host: {
    '[class.isPlanSettings]': 'selectedTab == 1',
  },
})
export class MainComponent extends AutoUnsubscribeComponent implements OnInit {
  screenSize: IScreenSize = '';
  innerWidth = 0;
  selectedTab = 0;
  firstName = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public profileSettingsService: ProfileSettingsService
  ) {
    super();
  }

  ngOnInit(): void {
    this.addSubscriptions(
      this.route.queryParams.subscribe((params: any) => {
        if (!params.tab) {
          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {
              tab: 0,
            },
            queryParamsHandling: 'merge', // remove to replace all query params by provided
          });
        } else {
          this.selectedTab = params.tab;
        }
      })
    );
    this.innerWidth = window.innerWidth;
    this.updateUI();

    this.addSubscriptions(
      this.profileSettingsService.personalInfo.subscribe((rs) => {
        this.firstName = rs.data.firstName;
      })
    );
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
    this.updateUI();
  }

  updateUI(): void {
    let screenSize: IScreenSize = 'desktop';

    if (this.innerWidth <= WIDTH_MOBILE_MAX) {
      screenSize = 'mobile';
    } else if (this.innerWidth <= WIDTH_TABLET_MAX) {
      screenSize = 'tablet';
    }

    this.screenSize = screenSize;
  }

  changeTab(tabIndex: number) {
    this.selectedTab = tabIndex;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        tab: this.selectedTab,
      },
      queryParamsHandling: 'merge', // remove to replace all query params by provided
    });
  }
}
