import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  private readonly APP_VERSION = '1.0.7';
  private readonly APP_NAME = 'Summoning Spells Calculator';
  private readonly LINK_KOFI = 'ko-fi.com/santigl';

  getAppVersion(): string {
    return this.APP_VERSION;
  }

  getAppName(): string {
    return this.APP_NAME;
  }

  getKoFiLink(): string {
    return this.LINK_KOFI;
  }

  getKoFiHref(): string {
    const link = this.getKoFiLink();
    return /^https?:\/\//i.test(link) ? link : `https://${link}`;
  }
}