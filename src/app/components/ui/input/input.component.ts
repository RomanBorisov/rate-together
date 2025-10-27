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
    id = input<string>('');

    type = input<InputType>(InputType.TEXT);

    placeholder = input<string>('');

    label = input<string>('');

    icon = input<string>('');

    required = input<boolean>(false);

    value = '';

    disabled = false;

    writeValue(value: string): void {
        this.value = value || '';
    }

    registerOnChange(fn: (value: string) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    onInputChange(value: string): void {
        this.value = value;
        this.onChange(value);
    }

    onBlur(): void {
        this.onTouched();
    }

    private onChange: (value: string) => void = () => {
    };

    private onTouched: () => void = () => {
    };
}
