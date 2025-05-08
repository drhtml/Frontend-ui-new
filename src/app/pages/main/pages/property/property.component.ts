import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss'],
  host: {
    '[class.notHaveRightProgress]': 'step === 5',
  },
})
export class PropertyComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
