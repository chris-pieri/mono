import { Component, input, model, output } from '@angular/core';
import { ListItem } from '../list-item/list-item';
import { NgClass } from '@angular/common';

@Component({
  selector: 'lib-list-item-checkbox',
  imports: [ListItem, NgClass],
  templateUrl: './list-item-checkbox.html',
  styleUrl: './list-item-checkbox.css',
})
export class ListItemCheckbox {
  title = input<string>();
  description = input<string>();
  selected = model<boolean>(false);
  changed = output();

  handleCheckboxChange() {
    this.selected.update((selected) => !selected);
    this.changed.emit();
  }
}
