import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { HelperService } from 'src/app/shared/services/helper.service';

@Component({
    selector: 'app-form-list',
    templateUrl: './form-list.component.html',
    styleUrls: ['./form-list.component.css']
})
export class FormListComponent implements OnInit {

    public _editInput: any = {
        correct: '',
        incorrect: '',
    };

    public _isActionDisabled: boolean = false;

    @Input('items') _items: any[] = [];
    @Input('formType') _formType: string;
    @Output('onDelete') _onDelete = new EventEmitter<any>();


    constructor(
        private _firebase: FirebaseService,
        private _helper: HelperService,
    ) { }

    ngOnInit() {
    }

    public onDelete(item: any): void {
        let r = confirm(`Do you want to delete "${item.incorrect}"?`);
        if (r) this._onDelete.emit(item);
    }

    public onEdit(item: any): void {
        item.onEdit = true;
        this._isActionDisabled = true;
    }

    public onSubmitEditing(item: any): void {
        if (this.isEditInputDirty()) {
            this._firebase.updateWord(this._formType, item.key, this._editInput, () => {
                console.log('edited!');
                this._helper.notifier('Item updated');
                this.resetEditInput();
            })
        }
        item.onEdit = false;
        this._isActionDisabled = false;
    }

    public onCancelEditing(item: any): void {
        item.onEdit = false;
        this.resetEditInput();
        this._isActionDisabled = false;
    }

    private resetEditInput(): void {
        this._editInput.correct = '';
        this._editInput.incorrect = '';
    }

    public onEditKeyup($event: any, name: string, item: any): void {
        this._editInput.correct = item.correct;
        this._editInput.incorrect = item.incorrect;
        let value: string = $event.target.value;
        this._editInput[name] = value;
    }

    private isEditInputDirty(): boolean {
        if (this._editInput.correct.trim() != '' || this._editInput.incorrect != '') return true;
        return false;
    }

    public isEditSubmitBtnDisabled(item: any): boolean {
        if (
            (this._editInput.incorrect.trim() != '' && this._editInput.correct.trim() != '') &&
            (this._editInput.correct != item.correct || this._editInput.incorrect != item.incorrect)
        ) return false;
        return true;
    }
}
