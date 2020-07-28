import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/shared/services/helper.service';
import { SpellCheckService } from '../../services/spell-check.service';

declare const $: any;

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

    public _input: string = '';
    private _output: string = '';

    constructor(
        public _helper: HelperService,
        private _spellCheck: SpellCheckService,
    ) { }

    ngOnInit() {
    }

    public onCheck(): void {
        this._output = this._spellCheck.check(this._input);
    }

    public onPaste(): void {
        this._helper.getClipboardContent((err, content) => {
            if (!err) {
                this._input = content;
                $('#area-input').val(this._input);
                this.onCheck();
            } else {
                alert('Can not paste');
                console.log('failed to get clipboard content', err);
            }
        })
    }

    public onCopy(): void {
        let value = $('#result-container').text();
        this._helper.copy(value);
    }

    public onInputTextareaKeyup($event): void {
        this._input = $event.target.value;
    }

    get output(): string {
        if (this._output.trim() != '') return this._output;
        return '<span class="text-muted">Waiting for result ...</span>';
    }

}
