import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface SummonHP {
  [spellId: string]: {
    current: number;
    max: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class HpTrackerService {
  private readonly STORAGE_KEY = 'summon-hp';
  private hpState$ = new BehaviorSubject<SummonHP>(this.loadHP());

  private loadHP(): SummonHP {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  }

  getHP(spellId: string): { current: number; max: number } | undefined {
    return this.hpState$.value[spellId];
  }

  setMaxHP(spellId: string, maxHP: number): void {
    const current = this.hpState$.value;
    const existing = current[spellId];

    current[spellId] = {
      current: existing ? Math.min(existing.current, maxHP) : maxHP,
      max: maxHP,
    };

    this.hpState$.next(current);
    this.saveToStorage(current);
  }

  updateCurrentHP(spellId: string, newCurrent: number): void {
    const current = this.hpState$.value;
    const summon = current[spellId];

    if (!summon) return;

    current[spellId] = {
      ...summon,
      current: Math.max(0, Math.min(newCurrent, summon.max)),
    };

    this.hpState$.next(current);
    this.saveToStorage(current);
  }

  heal(spellId: string, amount: number): void {
    const summon = this.getHP(spellId);
    if (summon) {
      this.updateCurrentHP(spellId, summon.current + amount);
    }
  }

  damage(spellId: string, amount: number): void {
    const summon = this.getHP(spellId);
    if (summon) {
      this.updateCurrentHP(spellId, summon.current - amount);
    }
  }

  resetHP(spellId: string): void {
    const summon = this.getHP(spellId);
    if (summon) {
      this.updateCurrentHP(spellId, summon.max);
    }
  }

  getHPObservable(spellId: string): Observable<{ current: number; max: number } | undefined> {
    return new Observable(observer => {
      observer.next(this.getHP(spellId));
      const subscription = this.hpState$.subscribe(() => {
        observer.next(this.getHP(spellId));
      });
      return () => subscription.unsubscribe();
    });
  }

  private saveToStorage(hp: SummonHP): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(hp));
    } catch {
      console.error('Error saving HP to storage');
    }
  }
}
