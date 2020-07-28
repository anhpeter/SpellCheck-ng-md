import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpellCheckRoutingModule } from './spell-check-routing.module';
import { IndexComponent } from './components/index/index.component';
import { FormComponent } from './components/form/form.component';
import { ModalComponent } from './components/modal/modal.component';
import { SharedModule } from '../shared/shared.module';
import { SpellCheckService } from './services/spell-check.service';
import { FirebaseService } from './services/firebase.service';
import { FormControlComponent } from './components/form-control/form-control.component';
import { FormListComponent } from './components/form-list/form-list.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        SpellCheckRoutingModule,
    ],
    declarations: [IndexComponent, FormComponent, ModalComponent, FormControlComponent, FormListComponent],
    providers: [SpellCheckService, FirebaseService]
})
export class SpellCheckModule { }
