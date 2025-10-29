import { effect, Injectable, signal } from '@angular/core';

const LIGHT_THEME = 'emerald';
const DARK_THEME = 'dim';

@Injectable({
  providedIn: 'root',
})
export class ThemeSwitcherService {
  private _theme = signal<'light' | 'dark'>('light');

  constructor() {
    const storedTheme = localStorage.getItem('theme');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    if (storedTheme) {
      this._theme.set(storedTheme as 'light' | 'dark');
    } else if (prefersDarkScheme.matches) {
      this._theme.set('dark');
    } else {
      this._theme.set('light');
    }

    effect(() => {
      const theme = this._theme() === 'light' ? LIGHT_THEME : DARK_THEME;
      document.documentElement.setAttribute('data-theme', theme);
    });
  }

  toggleTheme() {
    this._theme.update((theme) => (theme === 'light' ? 'dark' : 'light'));
    localStorage.setItem('theme', this._theme());
  }

  get theme() {
    return this._theme.asReadonly();
  }
}
