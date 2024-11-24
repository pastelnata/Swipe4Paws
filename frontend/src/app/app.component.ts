import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
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
  showFooter: boolean = true;
  showHeader: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
      this.showFooter = event.url !== '/register' && event.url !== '/register/shelter';
      this.showHeader = event.url !== '/register' && event.url !== '/register/shelter';
      }
    });
  }

  isProfileBarVisible: boolean = false;

  toggleProfileBar() {
    this.isProfileBarVisible = !this.isProfileBarVisible;
  }
}
