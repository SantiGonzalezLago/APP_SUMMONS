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

interface FiendStats {
  ac: number;
  hp: number;
  multiattackCount: number;
  attackDamage: string;
  deathThroesDamage: string;
}

@Component({
  selector: 'app-fiend',
  templateUrl: 'fiend.page.html',
  styleUrls: ['fiend.page.scss'],
  imports: [CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton, IonButtons, IonMenuButton, IonSelect, IonSelectOption, IonItem, IonIcon, HpModalComponent, SourceComponent],
})
export class FiendPage implements OnInit {
  selectedLevel = 6;
  selectedType: string = 'Demon';
  stats: FiendStats | null = null;
  currentHP = 0;
  maxHP = 0;
  isHPModalOpen = false;

  levels: number[] = [6, 7, 8, 9];
  types: string[] = ['Demon', 'Devil', 'Yugoloth'];

  private spellId = 'fiend';
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
    const ac = 12 + this.selectedLevel;

    const hpMap: { [key: string]: number } = {
      'Demon': this.selectedLevel * 15 - 40,
      'Devil': this.selectedLevel * 15 - 50,
      'Yugoloth': this.selectedLevel * 15 - 30
    };
    const hp = hpMap[this.selectedType];

    const multiattackCount = Math.max(1, Math.floor(this.selectedLevel / 2));

    const attackMap: { [key: string]: string } = {
      'Demon': `1d12 + ${3 + this.selectedLevel} necrotic`,
      'Devil': `2d6 + ${3 + this.selectedLevel} fire`,
      'Yugoloth': `1d8 + ${3 + this.selectedLevel} slashing`
    };
    const attackDamage = attackMap[this.selectedType];

    const deathThroesDamage = `2d10 + ${this.selectedLevel}`;

    this.stats = { ac, hp, multiattackCount, attackDamage, deathThroesDamage };
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
