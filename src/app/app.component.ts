import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { IonApp, IonRouterOutlet, IonMenu, IonContent, IonList, IonItem, IonLabel, IonMenuButton, IonIcon, Platform } from '@ionic/angular/standalone';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { addIcons } from 'ionicons';
import { star, starOutline } from 'ionicons/icons';
import { SpellsService, Spell } from './services/spells.service';
import { ConfigurationService } from './services/configuration.service';

addIcons({
  star,
  'star-outline': starOutline,
});

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [IonApp, IonRouterOutlet, IonMenu, IonContent, IonList, IonItem, IonLabel, IonMenuButton, IonIcon, CommonModule, RouterLink],
})
export class AppComponent implements OnInit, OnDestroy {
  spells: Spell[] = [];
  appName: string = '';
  appVersion: string = '';
  private destroy$ = new Subject<void>();
  private spellsService = inject(SpellsService);
  private configurationService = inject(ConfigurationService);
  private router = inject(Router);
  private platform = inject(Platform);
  private backButtonSubscription?: any;

  ngOnInit(): void {
    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(10, () => {
      this.goToHome();
    });

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
    this.backButtonSubscription?.unsubscribe();
  }

  isFavorite(spellId: string): boolean {
    return this.spellsService.isFavorite(spellId);
  }

  goToHome(): void {
    if (this.router.url !== '/home') {
      this.router.navigate(['/home']);
    }
  }
}
