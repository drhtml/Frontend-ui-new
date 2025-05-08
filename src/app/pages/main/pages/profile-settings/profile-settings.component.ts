import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { AutoUnsubscribeComponent } from 'src/app/components/auto-unsubscribe/auto-unsubscribe.component';
import {
  IResponsePersonalInfo,
  updateIResponsePersonalInfoToFormData,
} from 'src/app/interfaces/backendResponse/IResponsePersonalInfo';
import { emptyIFormPersonalInfo } from 'src/app/interfaces/IFormPersonalInfo';
import { ProfileSettingsService } from 'src/app/services/profile-settings.service';
import { phoneNumberValidator } from 'src/app/utils/form';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
})
export class ProfileSettingsComponent
  extends AutoUnsubscribeComponent
  implements OnInit
{
  innerWidth = 0;
  public form = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    type: new FormControl(''),
    address: new FormControl(''),
    phoneNumber: new FormControl('', [phoneNumberValidator()]),
    avatar: new FormControl({
      url: '',
      file: null,
    }),
  });
  responsePersonalInfo?: IResponsePersonalInfo;

  constructor(public profileSettingsService: ProfileSettingsService) {
    super();
  }

  ngOnInit(): void {
    this.addSubscriptions(
      this.profileSettingsService.personalInfo.subscribe((rs) => {
        const successResponse = rs as IResponsePersonalInfo;
        const formData = _.cloneDeep(emptyIFormPersonalInfo);
        updateIResponsePersonalInfoToFormData(formData, successResponse);
        this.form.patchValue(formData as any);
        this.responsePersonalInfo = successResponse;
      })
    );
  }
}
