import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { AuthInterceptor } from '../auth/auth.interceptor';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SettingsComponent } from './settings/settings-view/settings.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    provideHttpClient(withInterceptorsFromDi()),
  ],
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    MatIconModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
  ],
})
export class AppModule {}
