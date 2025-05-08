import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperModule } from 'swiper/angular';
import { LandingComponent } from './landing.component';
import { LandingRoutingModule } from './landing-routing.module';
import { ButtonModule } from 'src/app/components/button/button.module';
import { SectionHeaderComponent } from './components/section-header/section-header.component';
import { SectionHowItWorksComponent } from './components/section-how-it-works/section-how-it-works.component';
import { SectionWhyUseMyCanaryComponent } from './components/section-why-use-my-canary/section-why-use-my-canary.component';
import { SectionWhatOurCustomerSayComponent } from './components/section-what-our-customer-say/section-what-our-customer-say.component';
import { CustomerSayItemComponent } from './components/section-what-our-customer-say/customer-say-item/customer-say-item.component';
import { SectionWelcomeToMyCanaryComponent } from './components/section-welcome-to-my-canary/section-welcome-to-my-canary.component';
import { SectionBottomComponent } from './components/section-bottom/section-bottom.component';
import { ButtonBoxModule } from 'src/app/components/button-box/button-box.module';
import { ContentfulService } from 'src/app/services/contentful.service';
import { BottomLinksModule } from 'src/app/components/bottom-links/bottom-links.module';
import { BallAnimationComponent } from './components/ball-animation/ball-animation.component';

@NgModule({
  declarations: [
    LandingComponent,
    SectionHeaderComponent,
    SectionHowItWorksComponent,
    SectionWhyUseMyCanaryComponent,
    SectionWhatOurCustomerSayComponent,
    CustomerSayItemComponent,
    SectionWelcomeToMyCanaryComponent,
    SectionBottomComponent,
    BallAnimationComponent,
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    ButtonModule,
    SwiperModule,
    ButtonBoxModule,
    BottomLinksModule,
  ],
  providers: [ContentfulService],
})
export class LandingModule {}
