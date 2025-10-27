import { ChangeDetectorRef, inject, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { I18nService } from '../services/i18n.service';

@Pipe({
    name: 'translate',
    pure: false
})
export class TranslatePipe implements PipeTransform, OnDestroy {
    private i18n = inject(I18nService);

    private cdr = inject(ChangeDetectorRef);

    private lastLang = this.i18n.language();

    private subscription: any;

    constructor() {
        this.subscription = setInterval(() => {
            const currentLang = this.i18n.language();
            if (currentLang !== this.lastLang) {
                this.lastLang = currentLang;
                this.cdr.markForCheck();
            }
        }, 100);
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            clearInterval(this.subscription);
        }
    }

    transform(key: string): string {
        return this.i18n.translate(key);
    }
}
