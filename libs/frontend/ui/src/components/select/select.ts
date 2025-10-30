import { Component, input } from '@angular/core';

@Component({
  selector: 'lib-select',
  imports: [],
  templateUrl: './select.html',
  styleUrl: './select.css',
})
export class Select {
  label = input<string>('');
  notes = input<string>('');
  options = input<string[]>();
}
