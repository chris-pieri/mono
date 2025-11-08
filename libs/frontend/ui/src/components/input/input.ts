/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'lib-input',
  imports: [],
  templateUrl: './input.html',
  styleUrl: './input.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Input),
      multi: true,
    },
  ],
})
export class Input implements ControlValueAccessor {
  label = input<string>('');
  type = input<'text' | 'number'>('text');
  placeholder = input<string>('');
  note = input<string>('');

  // internal value + disabled state as signals
  protected value = signal<string | number>('');
  protected disabled = signal<boolean>(false);

  // ControlValueAccessor callbacks
  private onChange: (v: any) => void = () => {};
  private onTouched: () => void = () => {};

  // called by the forms API to write to the view
  writeValue(value: any): void {
    this.value.set(value ?? '');
  }

  // called by the forms API to register a change handler
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // called by the forms API to register a touched handler
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // called by the forms API to enable/disable the control
  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  // helper to wire up input events from the template
  handleInput(e: Event) {
    const value = this.castValue((e.target as HTMLInputElement).value);
    this.value.set(value);
    this.onChange(value);
  }

  private castValue(value: any): string | number {
    if (this.type() === 'number') {
      return Number(value) || 0;
    }
    return String(value);
  }

  // helper to mark touched from the template (e.g. on blur)
  markTouched() {
    this.onTouched();
  }
}
