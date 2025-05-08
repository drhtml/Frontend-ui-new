import { Component, Input, OnInit } from '@angular/core';
import { IContentfulCustomerSayItem } from 'src/app/interfaces/IContentfulCustomerSayItem';

@Component({
  selector: 'app-customer-say-item',
  templateUrl: './customer-say-item.component.html',
  styleUrls: ['./customer-say-item.component.scss']
})
export class CustomerSayItemComponent implements OnInit {
  @Input() whatYourCustomerSayItem?: IContentfulCustomerSayItem;

  constructor() { }

  ngOnInit(): void {
  }

}
