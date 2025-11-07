/* eslint-disable @typescript-eslint/no-explicit-any */
import { NgClass } from '@angular/common';
import {
  Component,
  computed,
  contentChild,
  ElementRef,
  input,
  viewChild,
} from '@angular/core';
import { Button } from '../button/button';

export interface DropdownItem {
  label: string;
  action: (context?: any) => void;
}

@Component({
  selector: 'lib-dropdown',
  imports: [NgClass],
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.css',
})
export class Dropdown {
  items = input<DropdownItem[]>([]);
  context = input<any>();
  align = input<'left' | 'right' | 'top' | 'center'>('left');
  private dropdown = viewChild<ElementRef<HTMLUListElement>>('dropdown');

  protected alignCssClass = computed(() => {
    switch (this.align()) {
      case 'left':
        return 'dropdown-start';
      case 'right':
        return 'dropdown-end';
      case 'top':
        return 'dropdown-top';
      case 'center':
        return 'dropdown-center';
      default:
        return 'dropdown-start';
    }
  });

  itemClicked(item: DropdownItem) {
    this.dropdown()?.nativeElement.blur();
    item.action(this.context());
  }
}
