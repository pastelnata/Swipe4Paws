import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import {FormsModule} from '@angular/forms';
import { HomeService } from './home.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    MatExpansionModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [HomeService],
})
export class HomeModule { }
