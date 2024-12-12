import { Routes } from '@angular/router';
import { HomeComponent } from './app/home/home-view/home.component';
import { AboutUsComponent } from './app/about-us/about-us-view/about-us.component';
import { SheltersComponent } from './app/shelters/shelters-view/shelters.component';
import { SwipeComponent } from './app/swipe/swipe-view/swipe.component';
import { PetsDetailsComponent } from './app/pets-details/pets-details-view/pets-details.component';
import { RegisterComponent } from './app/register/register-view/register.component';
import { ShelterRegisterComponent } from './app/shelter-register/shelter-register-view/shelter-register.component';
import { SheltersDetailsComponent } from './app/shelters/shelters-details/shelters-details.component';
import { ShelterAppComponent } from './app/shelter-app/shelter-app.component';
import { ModeratorComponent } from './app/moderator/moderator-view/moderator.component';
import { shelterGuard, userGuard, moderatorGuard } from './auth/auth.guard';
import { FavouritesComponent } from './app/favourites/favourites-view/favourites-view.component';
import { LoginComponent } from './app/login/login-view/login.component';

const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home Page',
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
    title: 'About Us',
  },
  {
    path: 'shelters',
    component: SheltersComponent,
    title: 'Shelters',
  },
  {
    path: 'shelters/:id',
    component: SheltersDetailsComponent,
    title: 'Shelters',
  },
  {
    path: 'swipe',
    component: SwipeComponent,
    title: 'Swipe',
  },
  {
    path: 'adopt',
    component: HomeComponent,
    title: 'Adopt',
  },
  {
    path: 'petInfo/:id',
    component: PetsDetailsComponent,
    title: 'Pet info',
  },
  {
    path: 'shelter-manager',
    component: ShelterAppComponent,
    canActivate: [shelterGuard],
    title: 'Shelter Page',
  },
  {
    path: 'moderator',
    component: ModeratorComponent,
    canActivate: [moderatorGuard],
    title: 'Moderator Page',
  },
  { 
    path: 'favourites', 
    component: FavouritesComponent, 
    canActivate: [userGuard],
    title: 'Favourites' 
  },
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'register', component: RegisterComponent, title: 'Sign Up' },
  { path: 'register/shelter', component: ShelterRegisterComponent, title: 'Shelter Sign Up' }
];

export default routeConfig;
