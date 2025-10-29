import { Component, effect, ElementRef, model, viewChild } from '@angular/core';
import { Button } from '../button/button';

@Component({
  selector: 'lib-overlay',
  imports: [Button],
  templateUrl: './overlay.html',
  styleUrl: './overlay.css',
})
export class Overlay {
  open = model(false);
  private dialogElement = viewChild<ElementRef<HTMLDialogElement>>('dialog');

  constructor() {
    effect(() => {
      if (this.open()) {
        this.dialogElement()?.nativeElement.showModal();
      } else {
        this.dialogElement()?.nativeElement.close();
      }
    });
  }

  handleClose() {
    this.open.set(false);
  }
}
