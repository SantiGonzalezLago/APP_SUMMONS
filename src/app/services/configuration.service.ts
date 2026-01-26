import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  private readonly APP_VERSION = '1.0.1';
  private readonly APP_NAME = 'Summoning Spells Calculator';

  getAppVersion(): string {
    return this.APP_VERSION;
  }

  getAppName(): string {
    return this.APP_NAME;
  }
}