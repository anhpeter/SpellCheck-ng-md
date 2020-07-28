import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelperService } from './services/helper.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [],
    providers: [HelperService]

})
export class SharedModule { }
