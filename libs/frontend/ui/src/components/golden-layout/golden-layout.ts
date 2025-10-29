import { Component, inject } from '@angular/core';
import { GoldenLayoutService } from '../../services/golden-layout.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'lib-golden-layout',
  imports: [NgClass],
  templateUrl: './golden-layout.html',
  styleUrl: './golden-layout.css',
})
export class GoldenLayout {
  layoutService = inject(GoldenLayoutService);
}
