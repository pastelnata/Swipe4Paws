import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import routeConfig from './routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { importProvidersFrom } from '@angular/core';  // Import from @angular/core
import { HttpClientModule } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routeConfig),
    provideAnimationsAsync(),
    importProvidersFrom(HttpClientModule)  // Proper usage of importProvidersFrom
  ]
})
  .catch(err => console.error(err));
