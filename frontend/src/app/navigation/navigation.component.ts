import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetsListingComponent } from '../pets-listing/pets-listing.component';


@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, PetsListingComponent],
  template: `
   <h1>Navigation is working</h1>
    <!-- Search engine, can be used -->
    <form>
        <input type="text" placeholder="Filter by name" #filter>
        <button class="primary" type="button" (click)="filterResults(filter.value)">
        Search</button>
    </form>
  `,
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {

}
