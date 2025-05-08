import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
  host: {
    '[class]': "'color-' + color",
  },
})
export class MenuItemComponent implements OnInit {
  @Input() color = '';

  constructor() {}

  ngOnInit(): void {}
}
