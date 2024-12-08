import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import {FormsModule} from '@angular/forms';
import { PopupModule } from '../popup/popup.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    MatExpansionModule,
    FormsModule,
    PopupModule
  ]
})
export class HomeModule { }
