import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-evaluation-slider',
  templateUrl: './evaluation-slider.component.html',
  styleUrls: ['./evaluation-slider.component.scss'],
})
export class EvaluationSliderComponent implements OnInit {
  @Input() formControl: FormControl = new FormControl(5);
  @Input() selectedDate = '';
  @Input() disabled = false;

  constructor() {}

  ngOnInit(): void {}
}
