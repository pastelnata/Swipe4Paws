import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  role!: string | null;
  isShelter!: boolean;
  // Form data for settings page
  settings = {
    name: '',
    email: '',
    password: '',
    theme: 'light',
    notifications: true,
  };

  shelterSettings = {
    name: '',
    email: '',
    password: '',
    address: '',
    postal_code: '',
    city: '',
    postalCode: null,
    description: '',
  };
  constructor(
    private auth: AuthService,
    private settingsService: SettingsService
  ) {}

  userid: number = 0;

  async ngOnInit() {
    this.auth.getId().subscribe((id) => {
      this.userid = id;
      console.log(`Loaded userid ${this.userid}`);
    });

    await this.getUserRole();
  }

  async getUserRole() {
    await this.auth.getTokenPayload().subscribe({
      next: (token) => {
        console.log(token);
        this.role = token?.role;
        console.log('User role:', this.role);
        if (this.role === 'user') {
          this.isShelter = false;
        } else if (this.role === 'shelter') {
          this.isShelter = true;
        }
      },
      error: (error) => {
        console.error('Error getting user role:', error);
      },
    });
  }

  async onSubmit() {
    console.log('user role:', this.role);
    if (this.role) {
      switch (this.role) {
        case 'user':
          console.log('Updating user...');
          await this.updateUser(
            this.userid,
            this.settings.name,
            this.settings.email,
            this.settings.password
          );
          this.clearForm();
          break;
        case 'shelter':
          console.log('Updating shelter...');
          await this.updateShelter(
            this.userid,
            this.shelterSettings.name,
            this.shelterSettings.email,
            this.shelterSettings.password,
            this.shelterSettings.address,
            this.shelterSettings.postal_code,
            this.shelterSettings.city,
            this.shelterSettings.description
          );
          this.clearForm();
          break;
      }
    }
  }

  clearForm() {
    this.settings = {
      name: '',
      email: '',
      password: '',
      theme: 'light',
      notifications: true,
    };
    this.shelterSettings = {
      name: '',
      email: '',
      password: '',
      address: '',
      postal_code: '',
      city: '',
      postalCode: null,
      description: '',
    };
  }

  updateUser(
    userId: number,
    username: string,
    email: string,
    password: string
  ) {
    console.log('sending request to service:', userId);
    return this.settingsService
      .updateUser(userId, username, email, password)
      .subscribe({
        next: (response) => {
          console.log(response);
          alert('Settings updated successfully');
          localStorage.setItem('token', response.token);
        },
        error: (error) => {
          console.error('Error updating user:', error);
        },
      });
  }

  updateShelter(
    userId: number,
    name: string,
    email: string,
    password: string,
    address: string,
    postal_code: string,
    city: string,
    description: string
  ) {
    return this.settingsService
      .updateShelter(
        userId,
        name,
        email,
        password,
        address,
        postal_code,
        city,
        description
      )
      .subscribe({
        next: (response) => {
          console.log(response);
          alert('Settings updated successfully');
          localStorage.setItem('token', response.token);
        },
        error: (error) => {
          console.error('Error updating shelter:', error);
          throw error;
        },
      });
  }
}
