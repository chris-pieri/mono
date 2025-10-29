import { Component, input } from '@angular/core';

@Component({
  selector: 'lib-list-item',
  imports: [],
  templateUrl: './list-item.html',
  styleUrl: './list-item.css',
})
export class ListItem {
  title = input<string>();
  description = input<string>();
}
