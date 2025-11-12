import { ChangeDetectorRef, inject, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { I18nService } from '../services/i18n.service';

@Pipe({
    name: 'translate',
    pure: false // eslint-disable-line @angular-eslint/no-pipe-impure
})
export class TranslatePipe implements PipeTransform, OnDestroy {
    private _i18n = inject(I18nService);

    private _cdr = inject(ChangeDetectorRef);

    private _lastLang = this._i18n.language();

    private _subscription: any;

    constructor() {
        this._subscription = setInterval(() => {
            const currentLang = this._i18n.language();
            if (currentLang !== this._lastLang) {
                this._lastLang = currentLang;
                this._cdr.markForCheck();
            }
        }, 100);
    }

    public ngOnDestroy(): void {
        if (this._subscription) {
            clearInterval(this._subscription);
        }
    }

    public transform(key: string): string {
        return this._i18n.translate(key);
    }
}
