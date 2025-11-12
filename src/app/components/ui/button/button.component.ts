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
    public readonly type = input<ButtonType>(ButtonType.BUTTON);

    public readonly variant = input<ButtonVariant>(ButtonVariant.PRIMARY);

    public readonly icon = input<string>('');

    public readonly disabled = input<boolean>(false);

    public readonly fullWidth = input<boolean>(false);

    public readonly loading = input<boolean>(false);

    public readonly btnClick = output<void>();

    public onClick(): void {
        if (!this.disabled() && !this.loading()) {
            this.btnClick.emit();
        }
    }
}
