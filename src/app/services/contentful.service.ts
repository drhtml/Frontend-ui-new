import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createClient, Entry } from 'contentful';
import { environment } from 'src/environments/environment';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class ContentfulService {
  private cdaClient = createClient({
    space: environment.contentful.space,
    accessToken: environment.contentful.accessToken,
  });

  constructor(private router: Router, private loadingService: LoadingService) {}

  async fetchLandingPage(query?: object): Promise<Entry<any>[]> {
    try {
      this.loadingService.start();
      const res = await this.cdaClient.getEntries(
        Object.assign(
          {
            content_type: environment.contentful.contentTypeIds.landingPage,
          },
          query
        )
      );
      this.loadingService.stop();
      return res.items;
    } catch {
      this.loadingService.stop();
      return [];
    }
  }

  async fetchAboutUs(query?: object): Promise<Entry<any>[]> {
    try {
      this.loadingService.start();
      const res = await this.cdaClient.getEntries(
        Object.assign(
          {
            content_type: environment.contentful.contentTypeIds.aboutUs,
          },
          query
        )
      );
      this.loadingService.stop();
      return res.items;
    } catch {
      this.loadingService.stop();
      return [];
    }
  }
}
