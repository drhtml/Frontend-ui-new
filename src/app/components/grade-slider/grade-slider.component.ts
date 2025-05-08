import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-grade-slider',
  templateUrl: './grade-slider.component.html',
  styleUrls: ['./grade-slider.component.scss'],
})
export class GradeSliderComponent implements OnInit {
  @Input() label = '';
  @Input() id = '';
  @Input() max = 10;
  @Input() min = 0;
  @Input() step = 1;
  @Input() formControl: FormControl = new FormControl(0);

  constructor() {}

  ngOnInit(): void {}
}
