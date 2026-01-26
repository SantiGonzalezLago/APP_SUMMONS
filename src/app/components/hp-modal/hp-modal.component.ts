import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonModal, IonButton, IonInput, IonItem } from '@ionic/angular/standalone';

@Component({
  selector: 'app-hp-modal',
  templateUrl: './hp-modal.component.html',
  styleUrls: ['./hp-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonModal, IonButton, IonInput, IonItem],
})
export class HpModalComponent {
  @Input() isOpen = false;
  @Input() currentHP = 0;
  @Input() maxHP = 0;
  @Output() close = new EventEmitter<void>();
  @Output() heal = new EventEmitter<number>();
  @Output() damage = new EventEmitter<number>();

  hpChangeAmount: number = 0;

  closeModal(): void {
    this.close.emit();
    this.hpChangeAmount = 0;
  }

  applyHeal(): void {
    if (this.hpChangeAmount > 0) {
      this.heal.emit(this.hpChangeAmount);
      this.hpChangeAmount = 0;
    }
  }

  applyFullHeal(): void {
    this.heal.emit(this.maxHP);
    this.hpChangeAmount = 0;
  }

  applyDamage(): void {
    if (this.hpChangeAmount > 0) {
      this.damage.emit(this.hpChangeAmount);
      this.hpChangeAmount = 0;
    }
  }

  increaseAmount(): void {
    this.hpChangeAmount = (this.hpChangeAmount || 0) + 1;
  }

  decreaseAmount(): void {
    this.hpChangeAmount = Math.max(0, (this.hpChangeAmount || 0) - 1);
  }
}
