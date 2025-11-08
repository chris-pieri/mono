/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'lib-select',
  imports: [],
  templateUrl: './select.html',
  styleUrl: './select.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Select),
      multi: true,
    },
  ],
})
export class Select implements ControlValueAccessor {
  label = input<string>('');
  notes = input<string>('');
  options = input<string[]>();

  // internal value + disabled state as signals
  protected value = signal<string>('');
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
  handleSelect(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    console.log('Select value changed to:', value);
    this.value.set(value);
    this.onChange(value);
  }

  // helper to mark touched from the template (e.g. on blur)
  markTouched() {
    this.onTouched();
  }
}
