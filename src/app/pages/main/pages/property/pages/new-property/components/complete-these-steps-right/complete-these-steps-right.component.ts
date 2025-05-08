import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-complete-these-steps-right',
  templateUrl: './complete-these-steps-right.component.html',
  styleUrls: ['./complete-these-steps-right.component.scss']
})
export class CompleteTheseStepsRightComponent implements OnInit {
  public isExpand = false;
  @Input() currentStep = 0;
  @Input() enablePreviewBtn = false;
  @Input() shouldShowPayment = false;
  @Output() review = new EventEmitter();
  public addPropertyDetailOptions = [
    'Property Name',
    'Photos',
    'Floor Plans',
    'Location',
    'Liveable Square Footage',
    'House Facts',
    'Interior Details',
    'Contact',
  ];
  public confirmExternalDataOptions = [
    'Remodeling / Renovations',
    'Heating',
    'Cooling',
    'Pool',
  ];

  constructor() { }

  ngOnInit(): void {
  }

  get stepGridHeight(): number {
    if (!this.isExpand) {
      return 100;
    }
    return 337;
  }

}
