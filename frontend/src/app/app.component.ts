import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home-view/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HeaderComponent } from "./header/header.component";
import { HomeModule } from './home/home.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, NavigationComponent, HeaderComponent, HomeModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'swipe4paws';
}
