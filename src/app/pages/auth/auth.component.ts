import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputComponent, InputType } from '../../components/ui/input/input.component';
import { ButtonComponent, ButtonType, ButtonVariant } from '../../components/ui/button/button.component';
import { I18nService } from '../../services/i18n.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { ImageComponent } from '../../components/ui/image/image.component';

enum AuthMode {
    LOGIN = 'login',
    REGISTER = 'register'
}

const TIMEOUTS = {
    SIMULATED_REQUEST: 1500
} as const;

@Component({
    selector: 'app-auth',
    imports: [CommonModule, FormsModule, InputComponent, ButtonComponent, TranslatePipe, ImageComponent],
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent {
    // Expose enums to template
    protected readonly InputType = InputType;

    protected readonly ButtonType = ButtonType;

    protected readonly ButtonVariant = ButtonVariant;

    protected i18n = inject(I18nService);

    protected readonly mode = signal<AuthMode>(AuthMode.LOGIN);

    protected readonly email = signal('');

    protected readonly password = signal('');

    protected readonly confirmPassword = signal('');

    protected readonly username = signal('');

    protected readonly loading = signal(false);

    protected readonly isLoginMode = computed(() => this.mode() === AuthMode.LOGIN);

    protected readonly isRegisterMode = computed(() => this.mode() === AuthMode.REGISTER);

    protected switchMode(): void {
        this.mode.update((current) => current === AuthMode.LOGIN
            ? AuthMode.REGISTER
            : AuthMode.LOGIN);
        this.clearForm();
    }

    protected clearForm(): void {
        this.email.set('');
        this.password.set('');
        this.confirmPassword.set('');
        this.username.set('');
    }

    protected onSubmit(): void {
        this.loading.set(true);

        // Simulating request
        setTimeout(() => {
            if (this.isLoginMode()) {
                console.log('Login:', { email: this.email(), password: this.password() });
            } else {
                console.log('Register:', {
                    username: this.username(),
                    email: this.email(),
                    password: this.password(),
                    confirmPassword: this.confirmPassword()
                });
            }
            this.loading.set(false);
        }, TIMEOUTS.SIMULATED_REQUEST);
    }
}
