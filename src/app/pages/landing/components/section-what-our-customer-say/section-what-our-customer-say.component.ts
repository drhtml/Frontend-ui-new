import { Component, Input, OnInit } from '@angular/core';
import { IContentfulCustomerSayItem } from 'src/app/interfaces/IContentfulCustomerSayItem';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, SwiperOptions } from 'swiper';


// install Swiper modules
SwiperCore.use([Pagination]);

@Component({
  selector: 'app-section-what-our-customer-say',
  templateUrl: './section-what-our-customer-say.component.html',
  styleUrls: ['./section-what-our-customer-say.component.scss']
})
export class SectionWhatOurCustomerSayComponent implements OnInit {

  @Input() whatYourCustomerSay: IContentfulCustomerSayItem[] = [];

  public paginationSetting = {
    clickable: true,
  }
  constructor() { }

  ngOnInit(): void {
  }
}
