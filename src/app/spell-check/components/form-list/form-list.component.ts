import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-form-list',
    templateUrl: './form-list.component.html',
    styleUrls: ['./form-list.component.css']
})
export class FormListComponent implements OnInit {
    @Input('items') _items: any[] = [];
    @Output('onDelete') _onDelete = new EventEmitter<any>();

    constructor() { }

    ngOnInit() {
    }

    public onDelete(item: any): void {
        let r = confirm(`Do you want to delete ${item.incorrect}`);
        if (r) this._onDelete.emit(item);
    }
}
