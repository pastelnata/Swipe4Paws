import { Routes } from "@angular/router";
import { HomeComponent } from "./app/home/home.component";

const routeConfig: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home Page'
    },
];

export default routeConfig;