import { Injectable } from '@angular/core';
import { Dic } from '../defines/dic';
import { FirebaseService } from './firebase.service';
import { HelperService } from 'src/app/shared/services/helper.service';

@Injectable({
    providedIn: 'root'
})
export class SpellCheckService {
    // sign
    public _correctSign: any;
    public _incorrectSign: any;

    // db words
    public _customWords: any[];
    public _generalWords: any[];

    // words
    public _incorrectCustomWords: string[] = [];
    public _incorrectGeneralWords: string[] = [];

    // dic
    private _dicArr: string[] = new Dic().data;

    constructor(
        private _helper: HelperService,
        private _firebase: FirebaseService,
    ) {
        this.setup();
    }

    private setup(): void {
        this._correctSign = {
            start: '<+<',
            end: '>+>',
        }

        this._incorrectSign = {
            start: '<-<',
            end: '>->',

        }

        this._firebase.getWords('custom', (items: any[]) => {

            this._customWords = this._helper.orderBy(items, 'incorrect', 'desc');;
            this.print('custom words', this._customWords);
        })

        this._firebase.getWords('general', (items: any[]) => {
            this._generalWords = this._helper.orderBy(items, 'incorrect', 'desc');;
            this.print('general words', this._generalWords);
        })

    }

    public check(str: string): any {
        let result = str.trim();

        result = this.checkCustomWords(result);
        this.print('check custom words', result);

        result = this.checkGeneralIncorrectWords(result);
        this.print('check general words', result);

        result = this.checkEachWord(result);
        this.print('check each word', result);

        result = this.standardizeSign(result);
        this.print('standardize', result);

        result = this.highlight(result);
        this.print('highlight', result);

        // clear sign
        //result = result.replace(new RegExp(this.getSignCondition(), 'g'), 'g');

        return result;
    }

    private standardizeSign(str: string): string {
        let result: string = str;

        // incorrect
        result = this.clearOverSign(result, this._incorrectSign);

        // correct
        result = this.clearOverSign(result, this._correctSign);

        return result;
    };

    private clearOverSign(str: string, signs: any): string {
        let result = str;
        let pattern: any = new RegExp(`(${this.strip(signs.start)}){2,}(((?!${this.strip(signs.end)}).)*)(${this.strip(signs.end)}){2,}`, 'g')
        this.print('pattern', pattern)
        
        result = result.replace(pattern, `${signs.start}$2${signs.end}`);
        return result;
    }

    private print(...args): void {
        //console.log(...args);
    }

    private checkCustomWords(str: string): string {
        let result: string = str;
        for (let item of this._customWords) {
            let pattern: any = new RegExp(`${item.incorrect}`, 'ig');
            let matchResult = result.match(pattern);
            if (matchResult) {
                for (let value of matchResult) {
                    if (value != item.correct) {
                        result = result.replace(value, this.toCorrectWord(item.correct));
                    }
                }
            }
        }
        return result;
    }

    private checkGeneralIncorrectWords(str: string): string {
        let result: string = str;
        for (let item of this._generalWords) {
            let pattern: any = new RegExp(`${item.incorrect}`, 'ig');
            result = result.replace(pattern, `${this.toCorrectWord(item.correct)}`);
        }
        return result;
        return str;
    }

    private solvePunctuation(str: string): string {
        return str;
    }

    private highlight(str: string): string {
        let result: string = str;

        // highlight correct words
        let temp: string = `(((?!${this.strip(this._correctSign.start)}).)*)`
        let pattern: any = new RegExp(`${this.strip(this._correctSign.start)}${temp}${this.strip(this._correctSign.end)}`, 'g');
        result = result.replace(pattern, '<span class="bg-correct rounded">$1</span>');

        //highlight incorrect words
        temp = `(((?!${this.strip(this._incorrectSign.start)}).)*)`
        pattern = new RegExp(`${this._incorrectSign.start}${temp}${this._incorrectSign.end}`, 'g');
        result = result.replace(pattern, '<span class="bg-incorrect rounded">$1</span>');
        return result;
    }

    private checkEachWord(str: string): string {
        let result = str;
        let pattern: any = new RegExp(`[\\s\\.\\,\\!\\@\\#\\%\\&\\^\\$\\*\\?\\(\\)\\"\\"\\'\\'\\:\\;\\“\\”\\-]+`, '');
        let clientWords: string[] = str.split(pattern);
        this.print('client word', clientWords);

        for (let word of clientWords) {
            let cleanWord: string = word.replace(new RegExp(`${this.getSignCondition()}`, 'g'), '').trim();
            if (this.isIncorrectWord(cleanWord))
                result = result.replace(new RegExp(`${cleanWord}`, 'ig'), `${this.toIncorrectWord(cleanWord)}`);
        }
        return result;
    }

    private toCorrectWord(word: string): string {
        return `${this._correctSign.start}${word}${this._correctSign.end}`;
    }

    private toIncorrectWord(word: string): string {
        return `${this._incorrectSign.start}${word}${this._incorrectSign.end}`;
    }

    private isIncorrectWord(word: string): boolean {
        word = word.trim().toLowerCase();
        if (!this._dicArr.includes(word) && !this.isCustomWord(word) && !this.isGeneralWord(word) && !this.isSpecialWord(word)) return true;
        return false;
    }

    private isSpecialWord(word: string): boolean {
        let flag: boolean = false;

        // number
        if (word.match(/^\d+$/)) flag = true;

        // time
        if (word.match(/^\d+h(\d+')?$/)) flag = true;

        // date
        if (word.match(/^\d+\/\d+(\/\d+)?$/)) flag = true;

        return flag;
    }

    private isCustomWord(word: string): boolean {
        let correctWords: string[] = [];
        for (let item of this._customWords)
            correctWords.push(item.correct.toLowerCase());
        return (correctWords.includes(word.toLowerCase())) ? true : false;
    }

    private isGeneralWord(word: string): boolean {
        let correctWords: string[] = [];
        for (let item of this._generalWords)
            correctWords.push(item.correct.toLowerCase());
        return (correctWords.includes(word.toLowerCase())) ? true : false;
    }

    private getSignCondition(): string {
        return `${this.strip(this._correctSign.start)}\|${this.strip(this._correctSign.end)}\|${this.strip(this._incorrectSign.start)}\|${this.strip(this._incorrectSign.end)}`
    }

    private strip(str: string): string {
        if (str.trim() != '') {
            let strArr: string[] = str.split('');
            let result: string = '';
            strArr.forEach((c: string) => {
                result += `\\${c}`;
            })
            return result;
        }
        return str;
    }
}
