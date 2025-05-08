import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mobile-menus',
  templateUrl: './mobile-menus.component.html',
  styleUrls: ['./mobile-menus.component.scss'],
})
export class MobileMenusComponent implements OnInit {
  @Input() isAdmin = false;
  public isOpenMenu = false;

  constructor() {}

  ngOnInit(): void {}
}
