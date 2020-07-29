import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-form-control',
    templateUrl: './form-control.component.html',
    styleUrls: ['./form-control.component.css']
})
export class FormControlComponent implements OnInit {
    public _correctInput: string = '';
    public _incorrectInput: string = '';

    @Input('formType') _formType: string;
    @Output('onSubmit') _onSubmit = new EventEmitter<any>();

    constructor() { }

    ngOnInit() {
    }

    public onSubmit(): void {
        if (this._incorrectInput.trim() != '' && this._correctInput.trim() != '') {
            this._onSubmit.emit({
                correct: this._correctInput,
                incorrect: this._incorrectInput,
            })
            this.reset();
        }
    }

    private reset(): void {
        this._incorrectInput = '';
        this._correctInput = '';
    }

    public getMenuClass(type?: string): object{
        let formType: string = (type == 'general') ? type : 'custom';
        let isActive: boolean = (formType == this._formType);
        return {
            btn: true,
            'btn-sm': true,
            'btn-secondary': !isActive,
            'btn-info': isActive,
        }
    }

    public isAddBtnDisabled(): boolean{
        if (this._incorrectInput.trim() != '' && this._correctInput.trim() != '') return false;
        return true;
    }
}
