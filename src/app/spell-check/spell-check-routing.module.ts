import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { FormComponent } from './components/form/form.component';

const routes: Routes = [
    { path: '', component: IndexComponent },
    {
        path: 'form',
        children: [
            { path: '', component: FormComponent },
            { path: ':type', component: FormComponent },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SpellCheckRoutingModule { }