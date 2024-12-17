import { Component } from '@angular/core';
import { ModeratorService } from '../moderator.service';
import { SheltersListing } from '../../models/shelters-listing';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-moderator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './moderator.component.html',
  styleUrl: './moderator.component.css',
})
export class ModeratorComponent {
  sheltersList: SheltersListing[] = [];
  ifNoShelters: boolean = false;
  constructor(private moderatorService: ModeratorService) {
    this.getPendingShelters();
  }

  async getPendingShelters() {
    try {
      this.moderatorService.getShelters().subscribe({
        next: (shelters: SheltersListing[]) => {
          shelters.forEach((shelter) => {
            if (shelter.status === 'Pending') {
              this.sheltersList.push(shelter);
            }
          });
          console.log('Pending shelters:', shelters);
        },
        error: (error) => {
          console.error('Error fetching pending shelters:', error);
          this.ifNoShelters = true;
        },
      });
    } catch (error) {
      console.error('Error fetching pending shelters:', error);
      this.ifNoShelters = true;
    }
  }

  async updateShelter(index: number, status: 'Approved' | 'Rejected') {
    const id = this.sheltersList[index].shelterid;
    if (id) {
      console.log(`updating shelter ${id} with status ${status}`)
      await this.moderatorService.updateShelterStatus(id, status).subscribe({
        next: () => {
          this.sheltersList = this.sheltersList.filter(
            (shelter) => shelter.shelterid !== id
          );
        },
        error: (error) => {
          console.log(error);
          alert(error.body);
        },
      });
    }
  }
}
