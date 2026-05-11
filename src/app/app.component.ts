import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonApp, IonRouterOutlet, Platform } from '@ionic/angular/standalone';
import { Subject } from 'rxjs';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [IonApp, IonRouterOutlet, CommonModule, MainMenuComponent],
})
export class AppComponent implements OnInit, OnDestroy {
  private themeService = inject(ThemeService);
  private destroy$ = new Subject<void>();
  private router = inject(Router);
  private platform = inject(Platform);
  private backButtonSubscription?: any;

  ngOnInit(): void {
    void this.themeService;
    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(10, () => {
      this.goToHome();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.backButtonSubscription?.unsubscribe();
  }

  goToHome(): void {
    if (this.router.url !== '/home') {
      this.router.navigate(['/home']);
    }
  }
}
