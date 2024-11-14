import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import routeConfig from './routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; 
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routeConfig), provideAnimationsAsync(), provideHttpClient(),
  ]
})
  .catch(err => console.error(err));
