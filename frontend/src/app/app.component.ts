import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home-view/home.component';
import { NavigationComponent } from './navigation/navigation-view/navigation.component';
import { HeaderComponent } from "./header/header.component";
import { HomeModule } from './home/home.module';
import { ProfileBarModule } from './profile-bar/profile-bar.module';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    CommonModule,
    HomeComponent, 
    NavigationComponent, 
    HeaderComponent, 
    HomeModule, 
    ProfileBarModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'swipe4paws';

  isProfileBarVisible: boolean = false;

  toggleProfileBar() {
    this.isProfileBarVisible = !this.isProfileBarVisible;
  }
}
