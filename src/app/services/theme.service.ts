import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ThemeMode = 'system' | 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly storageKey = 'theme';
  private readonly mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  private readonly currentTheme = new BehaviorSubject<ThemeMode>('system');

  public readonly currentTheme$ = this.currentTheme.asObservable();

  constructor() {
    this.initializeTheme();

    this.mediaQuery.addEventListener('change', () => {
      if (this.currentTheme.value === 'system') {
        this.applyTheme('system');
      }
    });
  }

  private initializeTheme(): void {
    const storedTheme = localStorage.getItem(this.storageKey) as ThemeMode | null;
    const theme = this.isValidTheme(storedTheme) ? storedTheme : 'system';

    this.currentTheme.next(theme);
    this.applyTheme(theme);
  }

  public setTheme(theme: ThemeMode): void {
    if (!this.isValidTheme(theme)) {
      theme = 'system';
    }

    if (theme === 'system') {
      localStorage.removeItem(this.storageKey);
    } else {
      localStorage.setItem(this.storageKey, theme);
    }

    this.currentTheme.next(theme);
    this.applyTheme(theme);
  }

  public getCurrentTheme(): ThemeMode {
    return this.currentTheme.value;
  }

  public getThemeOptions(): { value: ThemeMode; label: string }[] {
    return [
      { value: 'system', label: 'System Default' },
      { value: 'light', label: 'Light' },
      { value: 'dark', label: 'Dark' },
    ];
  }

  private isValidTheme(theme: string | null): theme is ThemeMode {
    return theme === 'system' || theme === 'light' || theme === 'dark';
  }

  private applyTheme(theme: ThemeMode): void {
    const useDark = theme === 'dark' || (theme === 'system' && this.mediaQuery.matches);

    document.documentElement.classList.toggle('ion-palette-dark', useDark);
  }
}