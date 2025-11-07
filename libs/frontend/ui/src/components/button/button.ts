import { Component, computed, input, output } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'lib-button',
  imports: [NgClass],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  color = input<'primary' | 'secondary' | 'tertiary' | 'error'>('primary');
  variant = input<'soft' | 'outline' | 'dash' | 'ghost'>();
  size = input<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md');
  disabled = input<boolean>(false);
  clicked = output<void>();

  private colorCssClass = computed(() => {
    switch (this.color()) {
      case 'primary':
        return 'btn-primary';
      case 'secondary':
        return 'btn-secondary';
      case 'tertiary':
        return 'btn-tertiary';
      case 'error':
        return 'btn-error';
      default:
        return 'btn-primary';
    }
  });

  private variantCssClass = computed(() => {
    switch (this.variant()) {
      case 'soft':
        return 'btn-soft';
      case 'outline':
        return 'btn-outline';
      case 'dash':
        return 'btn-dash';
      case 'ghost':
        return 'btn-ghost';
      default:
        return '';
    }
  });

  private sizeCssClass = computed(() => {
    switch (this.size()) {
      case 'xs':
        return 'btn-xs';
      case 'sm':
        return 'btn-sm';
      case 'md':
        return '';
      case 'lg':
        return 'btn-lg';
      case 'xl':
        return 'btn-xl';
      default:
        return '';
    }
  });

  private disabledCssClass = computed(() => {
    return this.disabled() ? 'btn-disabled' : '';
  });

  protected cssClasses = computed(() => {
    return [
      this.colorCssClass(),
      this.variantCssClass(),
      this.disabledCssClass(),
      this.sizeCssClass(),
    ];
  });

  protected handleClick() {
    this.clicked.emit();
  }
}
