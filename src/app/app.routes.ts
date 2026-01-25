import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'spell/aberration',
    loadComponent: () => import('./spell/aberration/aberration.page').then((m) => m.AberrationPage),
  },
  {
    path: 'spell/beast',
    loadComponent: () => import('./spell/beast/beast.page').then((m) => m.BeastPage),
  },
  {
    path: 'spell/celestial',
    loadComponent: () => import('./spell/celestial/celestial.page').then((m) => m.CelestialPage),
  },
  {
    path: 'spell/construct',
    loadComponent: () => import('./spell/construct/construct.page').then((m) => m.ConstructPage),
  },
  {
    path: 'spell/dragon',
    loadComponent: () => import('./spell/dragon/dragon.page').then((m) => m.DragonPage),
  },
  {
    path: 'spell/elemental',
    loadComponent: () => import('./spell/elemental/elemental.page').then((m) => m.ElementalPage),
  },
  {
    path: 'spell/fey',
    loadComponent: () => import('./spell/fey/fey.page').then((m) => m.FeyPage),
  },
  {
    path: 'spell/fiend',
    loadComponent: () => import('./spell/fiend/fiend.page').then((m) => m.FiendPage),
  },
  {
    path: 'spell/shadowspawn',
    loadComponent: () => import('./spell/shadowspawn/shadowspawn.page').then((m) => m.ShadowspawnPage),
  },
  {
    path: 'spell/undead',
    loadComponent: () => import('./spell/undead/undead.page').then((m) => m.UndeadPage),
  },
  {
    path: 'spell/giantinsect',
    loadComponent: () => import('./spell/giantinsect/giantinsect.page').then((m) => m.GiantInsectPage),
  },
  {
    path: 'spell/homunculus',
    loadComponent: () => import('./spell/homunculus/homunculus.page').then((m) => m.HomunculusPage),
  },
  {
    path: 'spell/steed',
    loadComponent: () => import('./spell/steed/steed.page').then((m) => m.SteedPage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
