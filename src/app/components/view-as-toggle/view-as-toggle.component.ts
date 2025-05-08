import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export type IViewAsType = 'grid' | 'list' | 'chart';
@Component({
  selector: 'app-view-as-toggle',
  templateUrl: './view-as-toggle.component.html',
  styleUrls: ['./view-as-toggle.component.scss'],
})
export class ViewAsToggleComponent implements OnInit {
  @Input() toggleList: IViewAsType[] = ['list', 'grid'];
  @Input() selectedView: IViewAsType = 'list';
  @Output() onChange = new EventEmitter<IViewAsType>();

  constructor() {}

  ngOnInit(): void {}
}
