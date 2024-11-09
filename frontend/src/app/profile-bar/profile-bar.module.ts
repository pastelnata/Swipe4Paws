import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileBarViewComponent } from './profile-bar-view/profile-bar-view/profile-bar-view.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    ProfileBarViewComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [
    ProfileBarViewComponent
  ]
})
export class ProfileBarModule { }
