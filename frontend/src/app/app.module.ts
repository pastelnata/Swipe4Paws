import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ProfileBarViewComponent } from './profile-bar/profile-bar-view/profile-bar-view/profile-bar-view.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    MatIconModule,

  ],
})
export class AppModule { }
