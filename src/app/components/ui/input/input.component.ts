import { ChangeDetectionStrategy, Component, forwardRef, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

export enum InputType {
    TEXT = 'text',
    EMAIL = 'email',
    PASSWORD = 'password'
}

@Component({
    selector: 'app-input',
    imports: [CommonModule, FormsModule],
    templateUrl: './input.component.html',
    styleUrl: './input.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputComponent),
            multi: true
        }
    ]
})
export class InputComponent implements ControlValueAccessor {
    public readonly id = input<string>('');

    public readonly type = input<InputType>(InputType.TEXT);

    public readonly placeholder = input<string>('');

    public readonly label = input<string>('');

    public readonly icon = input<string>('');

    public readonly required = input<boolean>(false);

    public value = '';

    public disabled = false;

    public writeValue(value: string): void {
        this.value = value || '';
    }

    public registerOnChange(fn: (value: string) => void): void {
        this._onChange = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this._onTouched = fn;
    }

    public setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    public handleInput(event: Event): void {
        const target = event.target as HTMLInputElement;
        this.onInputChange(target.value);
    }

    public onInputChange(value: string): void {
        this.value = value;
        this._onChange(value);
    }

    public onBlur(): void {
        this._onTouched();
    }

    private _onChange: (value: string) => void = () => {
        // Callback registered by ControlValueAccessor
    };

    private _onTouched: () => void = () => {
        // Callback registered by ControlValueAccessor
    };
}
