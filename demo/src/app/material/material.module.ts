import { NgModule } from '@angular/core';
import {
  MdButtonModule, MdGridListModule, MdIconModule, MdInputModule, MdListModule, MdButtonToggleModule,
  MdCardModule, MdChipsModule, MdAutocompleteModule, MdToolbarModule
} from '@angular/material';

@NgModule({
  imports: [
    MdGridListModule,
    MdInputModule,
    MdButtonModule,
    MdListModule,
    MdIconModule,
    MdButtonToggleModule,
    MdCardModule,
    MdChipsModule,
    MdAutocompleteModule,
    MdToolbarModule
  ],
  exports: [
    MdGridListModule,
    MdInputModule,
    MdButtonModule,
    MdListModule,
    MdIconModule,
    MdButtonToggleModule,
    MdCardModule,
    MdChipsModule,
    MdAutocompleteModule,
    MdToolbarModule
  ]
})
export class MaterialModule { }
