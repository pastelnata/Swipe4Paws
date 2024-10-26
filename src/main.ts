import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import routeConfig from './routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; 

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routeConfig), provideAnimationsAsync()
  ]
})
  .catch(err => console.error(err));
