import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton, IonButtons, IonMenuButton, IonSelect, IonSelectOption, IonItem, IonIcon } from '@ionic/angular/standalone';
import { SpellSelectionsService } from '../../services/spell-selections.service';
import { HpTrackerService } from '../../services/hp-tracker.service';
import { HpModalComponent } from '../../components/hp-modal/hp-modal.component';
import { SourceComponent } from '../../components/source/source.component';
import { SpellsService } from '../../services/spells.service';
import { addIcons } from 'ionicons';
import { star } from 'ionicons/icons';

addIcons({ star });

interface CelestialStats {
  ac: number;
  hp: number;
  multiattackCount: number;
  radiantBowDamage: string;
  radiantMaceDamage: string;
  healingTouch: string;
}

@Component({
  selector: 'app-celestial',
  templateUrl: 'celestial.page.html',
  styleUrls: ['celestial.page.scss'],
  imports: [CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton, IonButtons, IonMenuButton, IonSelect, IonSelectOption, IonItem, IonIcon, HpModalComponent, SourceComponent],
})
export class CelestialPage implements OnInit {
  selectedLevel = 5;
  selectedType: string = 'Avenger';
  stats: CelestialStats | null = null;
  currentHP = 0;
  maxHP = 0;
  isHPModalOpen = false;

  levels: number[] = [5, 6, 7, 8, 9];
  types: string[] = ['Avenger', 'Defender'];

  private spellId = 'celestial';
  private selectionsService = inject(SpellSelectionsService);
  private hpTracker = inject(HpTrackerService);
  private spellsService = inject(SpellsService);
  private router = inject(Router);

  ngOnInit(): void {
    const saved = this.selectionsService.getSelection(this.spellId);
    if (saved) {
      this.selectedLevel = saved.level;
      this.selectedType = saved.type;
    }
    this.updateStats();
    this.loadHP();
  }

  onLevelChange(level: number): void {
    this.selectedLevel = level;
    this.selectionsService.setSelection(this.spellId, level, this.selectedType);
    this.updateStats();
    this.updateMaxHP();
  }

  onTypeChange(type: string): void {
    this.selectedType = type;
    this.selectionsService.setSelection(this.spellId, this.selectedLevel, this.selectedType);
    this.updateStats();
    this.updateMaxHP();
  }

  private updateStats(): void {
    const acBase = this.selectedType === 'Avenger' ? 11 : 13;
    const ac = acBase + this.selectedLevel;
    const hp = this.selectedLevel * 10 - 10;
    const multiattackCount = Math.max(1, Math.floor(this.selectedLevel / 2));

    this.stats = {
      ac,
      hp,
      multiattackCount,
      radiantBowDamage: `2d6 + ${2 + this.selectedLevel}`,
      radiantMaceDamage: `1d10 + ${3 + this.selectedLevel}`,
      healingTouch: `2d8 + ${this.selectedLevel}`,
    };
  }

  private loadHP(): void {
    const saved = this.hpTracker.getHP(this.spellId);
    if (saved) {
      this.currentHP = saved.current;
      this.maxHP = saved.max;
    } else {
      this.updateMaxHP();
    }
  }

  private updateMaxHP(): void {
    if (this.stats) {
      const oldMaxHP = this.maxHP;
      const oldCurrentHP = this.currentHP;
      const hpLost = oldMaxHP - oldCurrentHP;

      this.maxHP = this.stats.hp;
      this.currentHP = Math.max(0, this.maxHP - hpLost);

      this.hpTracker.setMaxHP(this.spellId, this.maxHP);
      this.hpTracker.updateCurrentHP(this.spellId, this.currentHP);
    }
  }

  openHPModal(): void {
    this.isHPModalOpen = true;
  }

  closeHPModal(): void {
    this.isHPModalOpen = false;
  }

  onHeal(amount: number): void {
    this.hpTracker.heal(this.spellId, amount);
    this.loadHP();
    this.closeHPModal();
  }

  onDamage(amount: number): void {
    this.hpTracker.damage(this.spellId, amount);
    this.loadHP();
    this.closeHPModal();
  }

  resetHP(): void {
    this.hpTracker.resetHP(this.spellId);
    this.loadHP();
  }

  getHPPercentage(): number {
    return this.maxHP > 0 ? (this.currentHP / this.maxHP) * 100 : 0;
  }

  isTypeActive(type: string): boolean {
    return this.selectedType === type;
  }

  isFavorite(): boolean {
    return this.spellsService.isFavorite(this.spellId);
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }
}
