import { Component, computed, inject } from '@angular/core';
import { ThemeSwitcherService } from '../../services/theme-switcher.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'lib-theme-switcher',
  imports: [NgClass],
  templateUrl: './theme-switcher.html',
  styleUrl: './theme-switcher.css',
})
export class ThemeSwitcher {
  themeService = inject(ThemeSwitcherService);
  isLightTheme = computed(() => this.themeService.theme() === 'light');
  isDarkTheme = computed(() => this.themeService.theme() === 'dark');
}
