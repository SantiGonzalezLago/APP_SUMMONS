import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface SpellSelection {
  [spellId: string]: {
    level: number;
    type: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class SpellSelectionsService {
  private readonly STORAGE_KEY = 'spell-selections';
  private selections$ = new BehaviorSubject<SpellSelection>(this.loadSelections());

  private loadSelections(): SpellSelection {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  }

  getSelection(spellId: string): { level: number; type: string } | undefined {
    return this.selections$.value[spellId];
  }

  setSelection(spellId: string, level: number, type: string): void {
    const current = this.selections$.value;
    current[spellId] = { level, type };
    this.selections$.next(current);
    this.saveToStorage(current);
  }

  getSelectionObservable(spellId: string): Observable<{ level: number; type: string } | undefined> {
    return new Observable(observer => {
      observer.next(this.getSelection(spellId));
      const subscription = this.selections$.subscribe(() => {
        observer.next(this.getSelection(spellId));
      });
      return () => subscription.unsubscribe();
    });
  }

  private saveToStorage(selections: SpellSelection): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(selections));
    } catch {
      console.error('Error saving spell selections to storage');
    }
  }
}
