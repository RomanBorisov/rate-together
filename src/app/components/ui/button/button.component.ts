import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

export enum ButtonType {
    BUTTON = 'button',
    SUBMIT = 'submit'
}

export enum ButtonVariant {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    OUTLINE = 'outline'
}

@Component({
    selector: 'app-button',
    imports: [CommonModule],
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
    type = input<ButtonType>(ButtonType.BUTTON);

    variant = input<ButtonVariant>(ButtonVariant.PRIMARY);

    icon = input<string>('');

    disabled = input<boolean>(false);

    fullWidth = input<boolean>(false);

    loading = input<boolean>(false);

    btnClick = output<void>();

    onClick(): void {
        if (!this.disabled() && !this.loading()) {
            this.btnClick.emit();
        }
    }
}
