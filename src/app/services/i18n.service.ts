import { effect, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export enum Language {
    EN = 'en',
    RU = 'ru'
}

const STORAGE_KEYS = {
    LANGUAGE: 'app-language'
} as const;

interface TranslationData {
    [key: string]: any;
}

@Injectable({
    providedIn: 'root'
})
export class I18nService {
    public language = signal<Language>(this.getInitialLanguage());

    private translations = signal<TranslationData>({});

    constructor(private http: HttpClient) {
        // Load initial translations
        this.loadTranslations(this.language());

        effect(() => {
            const currentLang = this.language();
            this.saveLanguage(currentLang);
            this.loadTranslations(currentLang);
        });
    }

    public toggleLanguage(): void {
        this.language.update(current =>
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
        let value: any = this.translations();

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

    private loadTranslations(lang: Language): void {
        const path = `/assets/i18n/${lang}.json`;
        this.http.get<TranslationData>(path).subscribe({
            next: (data) => this.translations.set(data),
            error: (error) => console.error('Failed to load translations:', error)
        });
    }

    private getInitialLanguage(): Language {
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

    private saveLanguage(lang: Language): void {
        localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
    }
}
