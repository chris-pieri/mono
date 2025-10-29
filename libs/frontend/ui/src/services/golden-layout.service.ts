import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GoldenLayoutService {
  private _isRightSideOpen = signal(true);
  private _isMainOpen = signal(true);

  toggleRightSidebar() {
    this._isRightSideOpen.set(!this._isRightSideOpen());
  }

  toggleMain() {
    this._isMainOpen.set(!this._isMainOpen());
  }

  get isRightSideOpen() {
    return this._isRightSideOpen.asReadonly();
  }

  get isMainOpen() {
    return this._isMainOpen.asReadonly();
  }
}
