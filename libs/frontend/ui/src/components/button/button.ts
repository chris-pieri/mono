import { Component, computed, input, output } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'lib-button',
  imports: [NgClass],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  variant = input<'primary' | 'secondary' | 'tertiary'>('primary');
  disabled = input<boolean>(false);
  clicked = output<void>();

  protected variantCssClass = computed(() => {
    switch (this.variant()) {
      case 'primary':
        return 'btn-primary';
      case 'secondary':
        return 'btn-secondary';
      case 'tertiary':
        return 'btn-tertiary';
      default:
        return 'btn-primary';
    }
  });

  protected handleClick() {
    this.clicked.emit();
  }
}
