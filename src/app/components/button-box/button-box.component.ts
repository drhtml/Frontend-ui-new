import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-box',
  templateUrl: './button-box.component.html',
  styleUrls: ['./button-box.component.scss']
})
export class ButtonBoxComponent implements OnInit {
  @Input() isClose = false;
  @Input() forceShowHover = false;

  constructor() { }

  ngOnInit(): void {
  }

}
