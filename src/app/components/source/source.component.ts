import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SourceInfo {
  title: string;
  url: string;
}

@Component({
  selector: 'app-source',
  templateUrl: './source.component.html',
  styleUrls: ['./source.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class SourceComponent implements OnInit {
  @Input() id: string = '';

  sourceInfo: SourceInfo | null = null;

  private sources: { [key: string]: SourceInfo } = {
    'phb24': {
      title: "Player's Handbook (2024)",
      url: 'https://marketplace.dndbeyond.com/category/3709000'
    },
    'efota' : {
      title: 'Eberron: Forge of the Artificer',
      url: 'https://marketplace.dndbeyond.com/category/5147000'
    },
    'bomt' : {
      title: 'The Book of Many Things',
      url: 'https://marketplace.dndbeyond.com/category/SRC-00109'
    },
    'tcoe' : {
      title: "Tasha's Cauldron of Everything",
      url: 'https://marketplace.dndbeyond.com/category/SRC-00067'
    }
  };

  ngOnInit() {
    if (this.id && this.sources[this.id]) {
      this.sourceInfo = this.sources[this.id] ?? null;
    }
  }
}
