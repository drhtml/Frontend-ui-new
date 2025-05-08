import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-delete-this-property-right',
  templateUrl: './delete-this-property-right.component.html',
  styleUrls: ['./delete-this-property-right.component.scss']
})
export class DeleteThisPropertyRightComponent implements OnInit {
  @Output() review = new EventEmitter();
  @Output() save = new EventEmitter();
  @Output() deleteThis = new EventEmitter();
  public addPropertyDetailOptions = [
    'Property Name',
    'Photos',
    'Floor Plans',
    'House Facts',
    'Recent Improvements',
    'Contact',
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
