import { effect, Injectable, signal } from '@angular/core';

export enum Theme {
    LIGHT = 'light',
    DARK = 'dark'
}

const STORAGE_KEYS = {
    THEME: 'app-theme'
} as const;

@Injectable({
    providedIn: 'root'
})
export class ThemeService {

    // Create signal for theme
    public readonly theme = signal<Theme>(this._getInitialTheme());

    constructor() {
        // Effect to apply theme when it changes
        effect(() => {
            const currentTheme = this.theme();
            this._applyTheme(currentTheme);
            this._saveTheme(currentTheme);
        });
    }

    /**
     * Toggle theme
     */
    public toggleTheme(): void {
        this.theme.update((current) => current === Theme.LIGHT
            ? Theme.DARK
            : Theme.LIGHT);
    }

    /**
     * Set specific theme
     */
    public setTheme(theme: Theme): void {
        this.theme.set(theme);
    }

    /**
     * Get initial theme from localStorage or system settings
     */
    private _getInitialTheme(): Theme {
        // Check localStorage
        const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) as string | null;
        if (savedTheme === Theme.LIGHT || savedTheme === Theme.DARK) {
            return savedTheme as Theme;
        }

        // Check system settings
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return Theme.DARK;
        }

        return Theme.LIGHT;
    }

    /**
     * Apply theme to document
     */
    private _applyTheme(theme: Theme): void {
        document.documentElement.setAttribute('data-theme', theme);
    }

    /**
     * Save theme to localStorage
     */
    private _saveTheme(theme: Theme): void {
        localStorage.setItem(STORAGE_KEYS.THEME, theme);
    }
}
