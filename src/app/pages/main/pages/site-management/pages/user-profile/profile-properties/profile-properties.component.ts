import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IViewAsType } from 'src/app/components/view-as-toggle/view-as-toggle.component';
import { IOptionField } from 'src/app/interfaces/IOptionField';
import { IProperty } from 'src/app/interfaces/IProperty';
import { ISortObject } from 'src/app/interfaces/ITableConfig';

@Component({
  selector: 'app-profile-properties',
  templateUrl: './profile-properties.component.html',
  styleUrls: ['./profile-properties.component.scss'],
})
export class ProfilePropertiesComponent implements OnInit {
  @Input() avatarField = new FormControl();
  viewAs: IViewAsType = 'grid';
  sortBy: IOptionField[] = [
    {
      label: 'ID',
      key: 'id',
    },
    {
      label: 'Name',
      key: 'name',
    },
    {
      label: 'Properties',
      key: 'properties',
    },
    {
      label: 'Location',
      key: 'location',
    },
    {
      label: 'Leads',
      key: 'leads',
    },
    {
      label: 'Best Price Point',
      key: 'bestPricePoint',
    },
    {
      label: 'Last Login',
      key: 'lastLogin',
    },
  ];
  @Input() sortByFormControl: FormControl = new FormControl();
  sortable?: ISortObject;
  @Input() tableDatas: IProperty[] = [];
  @Input() isEdit = false;
  @Input() profileFormControl: FormGroup = new FormGroup({});

  constructor() {}

  ngOnInit(): void {
    this.sortByFormControl.valueChanges.subscribe((value) => {
      this.sortable = {
        key: value,
        direction: 'desc',
      };
  });}
}
