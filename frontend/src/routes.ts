import { Routes } from "@angular/router";
import { HomeComponent } from "./app/home/home-view/home.component";
import { AboutUsComponent } from "./app/about-us/about-us-view/about-us.component";
import { SheltersComponent } from "./app/shelters/shelters-view/shelters.component";
import { SwipeComponent } from "./app/swipe/swipe-view/swipe.component";
import { PetsDetailsComponent } from "./app/pets-details/pets-details-view/pets-details.component";
import { RegisterComponent } from "./app/register/register-view/register.component";
import { ShelterRegisterComponent } from "./app/shelter-register/shelter-register-view/shelter-register.component";
import { SheltersDetailsComponent } from "./app/shelters/shelters-details/shelters-details.component";
import { LoginComponent } from "./app/login/login-view/login.component";
import { ShelterAppComponent } from "./shelter-app/shelter-app.component";
import userGuard from "./auth/auth.guard";
import shelterGuard from "./auth/auth.guard";
import moderatorGuard from "./auth/auth.guard";
import { ModeratorComponent } from "./moderator/moderator.component";

const routeConfig: Routes = [
    { path: '', component: HomeComponent, canActivate: [userGuard], title: 'Home Page' },
    { path: 'about-us', component: AboutUsComponent, canActivate: [userGuard], title: 'About Us' },
    { path: 'shelters', component: SheltersComponent, canActivate: [userGuard],title: 'Shelters' },
    { path: 'shelters/:id', component: SheltersDetailsComponent, canActivate: [userGuard],title: 'Shelters' },
    { path: 'swipe', component: SwipeComponent, canActivate: [userGuard],title: 'Swipe' },
    { path: 'adopt', component: HomeComponent, canActivate: [userGuard],title: 'Adopt'},
    { path: 'petInfo/:id', component: PetsDetailsComponent, canActivate: [userGuard],title: 'Pet info' },
    { path: 'register', component: RegisterComponent, canActivate: [userGuard],title: 'Sign Up' },
    { path: 'register/shelter', component: ShelterRegisterComponent, canActivate: [userGuard],title: 'Shelter Sign Up' },
    { path: 'login', component: LoginComponent, canActivate: [userGuard],title: 'Login' },
    { path: 'shelter-manager', component: ShelterAppComponent, canActivate: [shelterGuard], title: 'Login' },
    { path: 'moderator', component: ModeratorComponent, canActivate: [moderatorGuard], title: 'Login' },
];

export default routeConfig;