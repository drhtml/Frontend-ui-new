import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as _ from 'lodash';
import { AutoUnsubscribeComponent } from 'src/app/components/auto-unsubscribe/auto-unsubscribe.component';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { IViewAsType } from 'src/app/components/view-as-toggle/view-as-toggle.component';
import { IFailRequest } from 'src/app/interfaces/backendResponse/IFailRequest';
import { IFetchPropertiesSuccess } from 'src/app/interfaces/backendResponse/IResponseProperty';
import { IProperty } from 'src/app/interfaces/IProperty';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss'],
})
export class PropertyListComponent
  extends AutoUnsubscribeComponent
  implements OnInit
{
  selectedView: IViewAsType = 'list';
  @Input() tableDatas: IProperty[] = [];
  @Output() removeItem = new EventEmitter<string>();

  constructor(
    public propertyService: PropertyService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    super();
  }

  ngOnInit(): void {
  }

  removeData(id: string): void {
    this.removeItem.emit(id);
  }
}
