import { Injectable } from '@angular/core';
import { NotifierService } from "angular-notifier";

@Injectable({
    providedIn: 'root'
})
export class HelperService {

    constructor(
        private _notifier: NotifierService,
    ) { }

    public copy(str: string): void {
        const el = document.createElement('textarea');
        el.value = str;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }

    public getClipboardContent(doneCallback: (err: any, data?: string) => void): void {
        navigator.clipboard.readText()
            .then(text => {
                doneCallback(null, text);
            })
            .catch(err => {
                doneCallback(err);
            });
    }

    public isFn(fn: any): boolean {
        if (fn !== null && typeof fn == 'function') return true;
        return false;
    }

    public orderBy(items: any[], field: string, order: string = 'desc'): any[] {
        if (items.length > 0) {
            return items.sort((a: any, b: any) => {
                let aVal: string = a[field].toLowerCase();;
                let bVal: string = b[field].toLowerCase();;
                return -aVal.localeCompare(bVal);
            })
        }
        return items
    }

    public notifier(message: string): void {
        if (message.trim() != '') {
            this._notifier.notify(
                "default",
                message,
            );
        }
    }
}
