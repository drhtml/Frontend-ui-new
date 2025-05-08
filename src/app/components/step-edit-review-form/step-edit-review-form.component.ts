import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IScreenSize } from 'src/app/interfaces/IScreenSize';

@Component({
  selector: 'app-step-edit-review-form',
  templateUrl: './step-edit-review-form.component.html',
  styleUrls: ['./step-edit-review-form.component.scss']
})
export class StepEditReviewFormComponent implements OnInit {
  @Input() isAdmin = false;
  @Input() public form = new FormGroup<any>({});
  @Input() screenSize: IScreenSize = 'desktop';
  @Output() review = new EventEmitter();
  @Output() save = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
