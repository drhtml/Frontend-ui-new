import { Component, Input, OnInit } from '@angular/core';
import { IProperty } from 'src/app/interfaces/IProperty';

@Component({
  selector: 'app-properties-grid-view',
  templateUrl: './properties-grid-view.component.html',
  styleUrls: ['./properties-grid-view.component.scss']
})
export class PropertiesGridViewComponent implements OnInit {
  @Input() tableDatas: IProperty[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
