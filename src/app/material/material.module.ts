import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatButtonToggleModule,
  MatCardModule,
  MatChipsModule,
  MatAutocompleteModule,
  MatToolbarModule,
  MatSelectModule
} from '@angular/material';

const MATERIAL_MODULES = [
  MatGridListModule,
  MatInputModule,
  MatButtonModule,
  MatListModule,
  MatIconModule,
  MatButtonToggleModule,
  MatCardModule,
  MatChipsModule,
  MatAutocompleteModule,
  MatToolbarModule,
  MatSelectModule
];

@NgModule({
  imports: [MATERIAL_MODULES],
  exports: [MATERIAL_MODULES]
})
export class MaterialModule { }
