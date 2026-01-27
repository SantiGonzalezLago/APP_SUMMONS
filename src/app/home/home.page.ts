import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonIcon, IonButtons, IonMenuButton, IonBadge } from '@ionic/angular/standalone';
import { SpellsService, Spell } from '../services/spells.service';
import { addIcons } from 'ionicons';
import { star, starOutline } from 'ionicons/icons';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

addIcons({
  star,
  'star-outline': starOutline,
});

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonIcon, IonButtons, IonMenuButton, IonBadge],
})
export class HomePage implements OnInit, OnDestroy {
  spells: Spell[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private spellsService: SpellsService,
    private router: Router
  ) {}

  ngOnInit(): void {
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

  goToSpell(url: string): void {
    this.router.navigateByUrl(url);
  }

  toggleFavorite(event: Event, spellId: string): void {
    event.stopPropagation();
    this.spellsService.toggleFavorite(spellId);
  }

  isFavorite(spellId: string): boolean {
    return this.spellsService.isFavorite(spellId);
  }

  getSpellIcon(spellId: string): string {
    const iconMap: { [key: string]: string } = {
      'aberration': 'fa-brain',
      'beast': 'fa-paw',
      'celestial': 'fa-star',
      'construct': 'fa-cube',
      'dragon': 'fa-dragon',
      'elemental': 'fa-water',
      'fey': 'fa-leaf',
      'fiend': 'fa-fire',
      'shadowspawn': 'fa-moon',
      'spiritofdeath': 'fa-skull-crossbones',
      'undead': 'fa-skull',
      'steed': 'fa-horse',
      'homunculus': 'fa-screwdriver-wrench',
      'giantinsect': 'fa-spider',
    };
    return iconMap[spellId] || 'fa-wand-magic-sparkles';
  }
}
