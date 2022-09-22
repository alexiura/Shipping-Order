import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,

 } from '@angular/material';

const MaterialComponents = [
  MatButtonModule,
  MatButtonToggleModule,
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatInputModule

]

@NgModule({
  declarations: [],
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
