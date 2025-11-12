import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Theme, ThemeService } from '../../services/theme.service';
import { I18nService } from '../../services/i18n.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { ImageComponent } from '../ui/image/image.component';

@Component({
    selector: 'app-header',
    imports: [CommonModule, RouterLink, TranslatePipe, ImageComponent],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
    protected themeService = inject(ThemeService);

    protected i18n = inject(I18nService);

    protected readonly isDarkTheme = computed(() => this.themeService.theme() === Theme.DARK);

    protected readonly currentLanguage = computed(() => this.i18n.language().toUpperCase());

    protected toggleTheme(): void {
        this.themeService.toggleTheme();
    }

    protected toggleLanguage(): void {
        this.i18n.toggleLanguage();
    }
}
