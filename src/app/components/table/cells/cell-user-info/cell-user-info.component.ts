import { Component, Input, OnInit } from '@angular/core';
import { emptyIUserInfo, IUserInfo } from 'src/app/interfaces/IUserInfo';

@Component({
  selector: 'app-cell-user-info',
  templateUrl: './cell-user-info.component.html',
  styleUrls: ['./cell-user-info.component.scss'],
})
export class CellUserInfoComponent implements OnInit {
  @Input() value: IUserInfo = emptyIUserInfo;

  constructor() {}

  ngOnInit(): void {}
}
