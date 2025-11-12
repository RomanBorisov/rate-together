import { effect, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export enum Language {
    EN = 'en',
    RU = 'ru'
}

const STORAGE_KEYS = {
    LANGUAGE: 'app-language'
} as const;

type TranslationData = Record<string, any>;

@Injectable({
    providedIn: 'root'
})
export class I18nService {
    public readonly language = signal<Language>(this._getInitialLanguage());

    private readonly _translations = signal<TranslationData>({});

    constructor(private _http: HttpClient) {
        // Load initial translations
        this._loadTranslations(this.language());

        effect(() => {
            const currentLang = this.language();
            this._saveLanguage(currentLang);
            this._loadTranslations(currentLang);
        });
    }

    public toggleLanguage(): void {
        this.language.update((current) =>
            current === Language.EN
                ? Language.RU
                : Language.EN
        );
    }

    public setLanguage(lang: Language): void {
        this.language.set(lang);
    }

    public translate(key: string): string {
        const keys = key.split('.');
        let value: any = this._translations();

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                console.warn(`Translation not found for key: ${key}`);
                return key;
            }
        }

        return typeof value === 'string'
            ? value
            : key;
    }

    private _loadTranslations(lang: Language): void {
        const path = `/assets/i18n/${lang}.json`;
        this._http.get<TranslationData>(path).subscribe({
            next: (data) => this._translations.set(data),
            error: (error) => console.error('Failed to load translations:', error)
        });
    }

    private _getInitialLanguage(): Language {
        const savedLang = localStorage.getItem(STORAGE_KEYS.LANGUAGE) as Language | null;
        if (savedLang === Language.EN || savedLang === Language.RU) {
            return savedLang;
        }

        const browserLang = navigator.language.toLowerCase();
        if (browserLang.startsWith('ru')) {
            return Language.RU;
        }

        return Language.EN;
    }

    private _saveLanguage(lang: Language): void {
        localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
    }
}
