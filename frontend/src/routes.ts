import { Routes } from "@angular/router";
import { HomeComponent } from "./app/home/home-view/home.component";
import { AboutUsComponent } from "./app/about-us/about-us-view/about-us.component";
import { SheltersComponent } from "./app/shelters/shelters-view/shelters.component";
import { SwipeComponent } from "./app/swipe/swipe-view/swipe.component";
import { PetsDetailsComponent } from "./app/pets-details/pets-details-view/pets-details.component";
import { RegisterComponent } from "./app/register/register-view/register.component";
import { ShelterRegisterComponent } from "./app/shelter-register/shelter-register-view/shelter-register.component";
import { SheltersDetailsComponent } from "./app/shelters/shelters-details/shelters-details.component";

const routeConfig: Routes = [
    { path: '', component: HomeComponent, title: 'Home Page' },
    { path: 'about-us', component: AboutUsComponent, title: 'About Us' },
    { path: 'shelters', component: SheltersComponent, title: 'Shelters' },
    { path: 'shelters/:id', component: SheltersDetailsComponent, title: 'Shelters' },
    { path: 'swipe', component: SwipeComponent, title: 'Swipe' },
    { path: 'adopt', component: HomeComponent, title: 'Adopt'},
    { path: 'petInfo/:id', component: PetsDetailsComponent, title: 'Pet info' },
    { path: 'register', component: RegisterComponent, title: 'Sign Up' },
    { path: 'register/shelter', component: ShelterRegisterComponent, title: 'Shelter Sign Up' }
];

export default routeConfig;