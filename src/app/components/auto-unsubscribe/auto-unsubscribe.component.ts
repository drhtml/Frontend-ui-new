import { Component, OnDestroy } from '@angular/core';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';

@Component({
  template: '',
})
export abstract class AutoUnsubscribeComponent implements OnDestroy {
  subscriptions: { key: string; subscription: Subscription }[] = [];

  public ngOnDestroy(): void {
    _.forEach(this.subscriptions, (sub) => {
      sub.subscription.unsubscribe();
    });
  }

  protected addSubscriptions(sub: Subscription, key = '') {
    if (key) {
      const oldSubscriptions = _.remove(this.subscriptions as any, (s: any) => s.key === key);
      _.forEach(oldSubscriptions, (oldSub) => {
        oldSub.subscription.unsubscribe();
      });
    }
    this.subscriptions.push({
      key,
      subscription: sub,
    });
  }

  removeSubscription(key: string): void {
    const oldSubscriptions = _.remove(this.subscriptions as any, (s: any) => s.key === key);
    // ... existing code ...
  }
}
