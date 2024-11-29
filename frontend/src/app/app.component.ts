import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavigationComponent } from './navigation/navigation-view/navigation.component';
import { HeaderComponent } from "./header/header.component";
import { HomeModule } from './home/home.module';
import { ProfileBarModule } from './profile-bar/profile-bar.module';
import { ProfileBarViewComponent } from './profile-bar/profile-bar-view/profile-bar-view/profile-bar-view.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    NavigationComponent,
    HeaderComponent,
    HomeModule,
    ProfileBarModule,
    ProfileBarViewComponent

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
      this.showFooter = event.url !=='/login' && event.url !== '/register' && event.url !== '/register/shelter';
      this.showHeader = event.url !=='/login' && event.url !== '/register' && event.url !== '/register/shelter';
      }
    });
  }

  isProfileBarVisible: boolean = false;

  toggleProfileBar() {
    this.isProfileBarVisible = !this.isProfileBarVisible;
  }
}
