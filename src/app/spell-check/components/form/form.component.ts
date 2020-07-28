import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HelperService } from 'src/app/shared/services/helper.service';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
    public _correctInput: string = '';
    public _incorrectInput: string = '';


    public _formType: string;
    public _items: any[] = [];

    constructor(
        private _helper: HelperService,
        private _firebase: FirebaseService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.setup();
    }

    private setup(): void {
        this._activatedRoute.params.subscribe((params: Params) => {
            this._formType = (['general'].includes(params.type)) ? params.type : 'custom';
            this._firebase.getWords(this._formType, (items: any[]) => {
                this._items = this._helper.orderBy(items, 'key', 'desc');;
            })
        })
    }

    public onDelete(item: any): void {
        this._firebase.deleteWord(this._formType, item.key);
    }

    // add
    public onSubmit(data: any): void {
        this._firebase.addWord(this._formType, data);
    }
}
