import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';

import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from "@ngrx/store-devtools";

import {AppComponent} from './app.component';
import {BoardComponent} from './board/board.component';
import {CellComponent} from './cell/cell.component';
import {ControlsComponent} from './controls/controls.component';
import {appReducer} from "./store/app.reducer";
import {environment} from "../environments/environment";
import {EffectsModule} from "@ngrx/effects";
import {ControlsEffects} from "./controls/store/controls.effects";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    CellComponent,
    ControlsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    EffectsModule.forRoot([ControlsEffects]),
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument({logOnly: environment.production}),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
