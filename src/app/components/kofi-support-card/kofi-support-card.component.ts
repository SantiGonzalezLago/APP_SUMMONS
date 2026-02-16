import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationService } from '../../services/configuration.service';

@Component({
  selector: 'app-kofi-support-card',
  templateUrl: './kofi-support-card.component.html',
  styleUrls: ['./kofi-support-card.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class KofiSupportCardComponent {
  @Input() title: string = 'Support me on Ko-fi!';
  @Input() avatarSrc: string = 'assets/images/avatar.png';
  @Input() kofiIconSrc: string = 'assets/images/kofi.png';

  href: string = '';
  displayUrl: string = '';
  private configurationService = inject(ConfigurationService);

  constructor() {
    this.href = this.configurationService.getKoFiHref();
    this.displayUrl = this.configurationService.getKoFiLink();
  }
}
