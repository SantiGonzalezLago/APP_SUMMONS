import { Component, OnInit, OnDestroy, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IonMenu, IonContent, IonList, IonItem, IonLabel, IonIcon } from '@ionic/angular/standalone';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { addIcons } from 'ionicons';
import { star, starOutline } from 'ionicons/icons';
import { SpellsService, Spell } from '../../services/spells.service';
import { ConfigurationService } from '../../services/configuration.service';
import { KofiSupportCardComponent } from '../kofi-support-card/kofi-support-card.component';

addIcons({
  star,
  'star-outline': starOutline,
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

  ngOnInit(): void {
    this.appName = this.configurationService.getAppName();
    this.appVersion = this.configurationService.getAppVersion();

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
}
