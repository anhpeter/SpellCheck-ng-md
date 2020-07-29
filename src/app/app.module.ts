import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { SpellCheckModule } from './spell-check/spell-check.module';
import { RouterModule } from '@angular/router';
import { NotifierModule } from "angular-notifier";

// firebase
import { environment } from "src/environments/environment";
import { AngularFireModule } from '@angular/fire';



@NgModule({
    declarations: [
        AppComponent,
        NotFoundComponent
    ],
    imports: [
        BrowserModule,
        RouterModule,
        SpellCheckModule,
        AppRoutingModule,

        // firebase
        AngularFireModule.initializeApp(environment.firebase, 'spell-check-53a6a'),

        // other module
        NotifierModule.withConfig({
            position: {
                horizontal: {
                    position: "right",
                },
                vertical: {
                    position: "top",
                }
            },
            behaviour: {
                autoHide: 3000,
            },
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
