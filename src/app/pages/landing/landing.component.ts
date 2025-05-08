import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { IContentfulCardItem } from 'src/app/interfaces/IContentfulCardItem';
import { IContentfulCustomerSayItem } from 'src/app/interfaces/IContentfulCustomerSayItem';
import { IContentfulLandingPage } from 'src/app/interfaces/IContentfulLandingPage';
import { IContentfulRichText } from 'src/app/interfaces/IContentfulRichText';
import { ContentfulService } from 'src/app/services/contentful.service';
import { debounce } from 'src/app/utils/other';
import { BallAnimationComponent } from './components/ball-animation/ball-animation.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  landingContentfulData?: IContentfulLandingPage;
  whyUseMyCanary?: IContentfulRichText;
  welcomeToMyCanary?: IContentfulRichText;
  howItWorks: IContentfulCardItem[] = [];
  whatYourCustomerSay: IContentfulCustomerSayItem[] = [];
  description = '';
  @ViewChild('ballAnimation') refBallAnimation?: BallAnimationComponent;

  constructor(
    private contentfulService: ContentfulService,
    private elRef: ElementRef
  ) {}

  ngOnInit(): void {
    window.addEventListener('scroll', this.scrollFunction.bind(this), true);

    this.contentfulService.fetchLandingPage().then((pages) => {
      if (pages.length > 0) {
        this.landingContentfulData = pages[0];
        this.updateUIData();
      }
    });
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scrollFunction.bind(this), true);
  }

  updateUIData() {
    if (this.landingContentfulData) {
      this.description = this.landingContentfulData.fields.description;
      this.howItWorks = this.landingContentfulData.fields.howItWorks;
      this.whyUseMyCanary = this.landingContentfulData.fields.whyUseMyCanary;
      this.whatYourCustomerSay =
        this.landingContentfulData.fields.whatYourCustomerSay;
      this.welcomeToMyCanary =
        this.landingContentfulData.fields.welcomeToMyCanary;

      setTimeout(() => {
        this.refBallAnimation?.resetAnimation();
      }, 1000);
    }
  }

  scrollToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  @HostListener('window:resize', ['$event'])
  @debounce()
  onResize() {
    this.refBallAnimation?.resetAnimation();
    this.scrollFunction();
  }

  scrollFunction() {
    const scrollTop =
      document.body.scrollTop || document.documentElement.scrollTop;
    const scrollMaxY =
      (window as any).scrollMaxY ||
      document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const positionProgress = (scrollTop * 1.0) / scrollMaxY;
    this.refBallAnimation?.nextAnimation(positionProgress);
  }
}
