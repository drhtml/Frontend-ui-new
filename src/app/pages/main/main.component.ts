import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AutoUnsubscribeComponent } from 'src/app/components/auto-unsubscribe/auto-unsubscribe.component';
import { IFailRequest } from 'src/app/interfaces/backendResponse/IFailRequest';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { PlanService } from 'src/app/services/plan.service';
import { ProfileSettingsService } from 'src/app/services/profile-settings.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent extends AutoUnsubscribeComponent implements OnInit {
  isAdmin = false;

  constructor(
    public authenticateService: AuthenticateService,
    public profileSettingsService: ProfileSettingsService,
    public planService: PlanService,
    private _snackBar: MatSnackBar
  ) {
    super();
  }

  ngOnInit(): void {
    this.isAdmin = this.authenticateService.role === 'ADMIN';

    this.addSubscriptions(
      this.profileSettingsService.fetchPersonalInfo().subscribe((rs) => {
        if (rs.success === false) {
          const failResponse = rs as IFailRequest;
          this._snackBar.open(failResponse.message, 'CLOSE', {
            verticalPosition: 'top',
            panelClass: 'error',
            duration: 3000,
          });
        }
      })
    );
  }
}
