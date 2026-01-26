import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Spell {
  id: string;
  name: string;
  level: number;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class SpellsService {
  private spells: Spell[] = [
    { id: "aberration", name: "Summon Aberration", level: 4, url: "/spell/aberration" },
    { id: "beast", name: "Summon Beast", level: 2, url: "/spell/beast" },
    { id: "celestial", name: "Summon Celestial", level: 5, url: "/spell/celestial" },
    { id: "construct", name: "Summon Construct", level: 4, url: "/spell/construct" },
    { id: "dragon", name: "Summon Dragon", level: 5, url: "/spell/dragon" },
    { id: "elemental", name: "Summon Elemental", level: 4, url: "/spell/elemental" },
    { id: "fey", name: "Summon Fey", level: 3, url: "/spell/fey" },
    { id: "fiend", name: "Summon Fiend", level: 6, url: "/spell/fiend" },
    { id: "shadowspawn", name: "Summon Shadowspawn", level: 3, url: "/spell/shadowspawn" },
    { id: "undead", name: "Summon Undead", level: 3, url: "/spell/undead" },
    { id: "steed", name: "Find Steed", level: 2, url: "/spell/steed" },
    { id: "homunculus", name: "Homunculus Servant", level: 2, url: "/spell/homunculus" },
    { id: "giantinsect", name: "Giant Insect", level: 4, url: "/spell/giantinsect" },
    { id: "spiritofdeath", name: "Spirit of Death", level: 4, url: "/spell/spiritofdeath" },
  ];

  private favorites: string[] = [];
  private storageKey = 'favorites';

  private spellsSubject = new BehaviorSubject<Spell[]>(this.getSpells());
  public spells$ = this.spellsSubject.asObservable();

  constructor() {
    this.loadFavorites();
    this.notifyChange();
  }

  private loadFavorites(): void {
    const stored = localStorage.getItem(this.storageKey);
    this.favorites = stored ? JSON.parse(stored) : [];
  }

  private saveFavorites(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.favorites));
  }

  getSpells(): Spell[] {
    const favorites = this.spells.filter(spell => this.favorites.includes(spell.id));
    const nonFavorites = this.spells.filter(spell => !this.favorites.includes(spell.id));
    return [...favorites, ...nonFavorites];
  }

  getSpellsObservable(): Observable<Spell[]> {
    return this.spellsSubject.asObservable();
  }

  toggleFavorite(spellId: string): void {
    const index = this.favorites.indexOf(spellId);
    if (index > -1) {
      this.favorites.splice(index, 1);
    } else {
      this.favorites.push(spellId);
    }
    this.saveFavorites();
    this.notifyChange();
  }

  isFavorite(spellId: string): boolean {
    return this.favorites.includes(spellId);
  }

  private notifyChange(): void {
    this.spellsSubject.next(this.getSpells());
  }
}


