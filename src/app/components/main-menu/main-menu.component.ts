import { Component, OnInit, OnDestroy, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IonMenu, IonContent, IonList, IonItem, IonLabel, IonIcon } from '@ionic/angular/standalone';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { addIcons } from 'ionicons';
import { moonOutline, sunnyOutline, phonePortraitOutline, star, starOutline } from 'ionicons/icons';
import { SpellsService, Spell } from '../../services/spells.service';
import { ConfigurationService } from '../../services/configuration.service';
import { KofiSupportCardComponent } from '../kofi-support-card/kofi-support-card.component';
import { ThemeMode, ThemeService } from 'src/app/services/theme.service';
import { ActionSheetController } from '@ionic/angular';

addIcons({
  star,
  'star-outline': starOutline,
  sunnyOutline,
  moonOutline,
  phonePortraitOutline
});

@Component({
  selector: 'main-menu',
  templateUrl: 'main-menu.component.html',
  styleUrls: ['main-menu.component.scss'],
  imports: [IonMenu, IonContent, IonList, IonItem, IonLabel, IonIcon, CommonModule, RouterLink, KofiSupportCardComponent],
})
export class MainMenuComponent implements OnInit, OnDestroy {
  @ViewChild(IonMenu) menu!: IonMenu;

  spells: Spell[] = [];
  appName: string = '';
  appVersion: string = '';
  private destroy$ = new Subject<void>();
  private spellsService = inject(SpellsService);
  private configurationService = inject(ConfigurationService);
  private themeService = inject(ThemeService);
  private actionSheetCtrl = inject(ActionSheetController);

  currentTheme: ThemeMode = 'system';
  themeOptions: { value: ThemeMode; label: string }[] = [];

  ngOnInit(): void {
    this.appName = this.configurationService.getAppName();
    this.appVersion = this.configurationService.getAppVersion();

    this.currentTheme = this.themeService.getCurrentTheme();
    this.themeOptions = this.themeService.getThemeOptions();

    this.themeService.currentTheme$.subscribe(theme => {
      this.currentTheme = theme;
    });

    this.spellsService.getSpellsObservable()
      .pipe(takeUntil(this.destroy$))
      .subscribe((spells) => {
        this.spells = spells;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  isFavorite(spellId: string): boolean {
    return this.spellsService.isFavorite(spellId);
  }

  closeMenu(): void {
    this.menu?.close();
  }

  async openThemeSelector(): Promise<void> {
    const buttons = this.themeOptions.map((theme) => {
      const isActive = theme.value === this.currentTheme;

      return {
        text: theme.label,
        icon: this.getThemeIcon(theme.value),
        cssClass: this.getThemeButtonClasses(theme.value, isActive),
        handler: () => {
          this.themeService.setTheme(theme.value);
        },
      };
    });

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        ...buttons,
      ],
    });

    await actionSheet.present();
  }

  private getThemeButtonClasses(themeValue: ThemeMode, isActive: boolean): string {
    const classes = ['theme-option', `theme-${themeValue}`];

    if (isActive) {
      classes.push('active-theme');
    }

    return classes.join(' ');
  }

  private getThemeIcon(theme: ThemeMode): string {
    if (theme === 'light') {
      return 'sunny-outline';
    }

    if (theme === 'dark') {
      return 'moon-outline';
    }

    return 'phone-portrait-outline';
  }
}
