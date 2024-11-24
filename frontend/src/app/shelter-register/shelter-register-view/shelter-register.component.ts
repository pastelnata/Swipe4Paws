import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ShelterRegisterService } from '../shelter-register.service';
import { ShelterModel } from '../../models/ShelterModel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shelter-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shelter-register.component.html',
  styleUrl: './shelter-register.component.css',
})
export class ShelterRegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  address: string = '';
  postal_code!: number;
  city: string = '';
  errorMessage!: string;

  constructor(
    private router: Router,
    private shelterRegisterService: ShelterRegisterService
  ) {}

  async register(form: NgForm) {
    if (form.invalid || this.invalidInput()) {
      console.log('Invalid input');
      return;
    } else {
      console.log(
        `Registering shelter ${this.email}, ${this.name}, ${this.password}, ${this.address}, ${this.postal_code}, ${this.city}`
      );
      const newShelter = this.registerShelter();

      try {
        await this.shelterRegisterService.createShelter(newShelter);
        console.log('Shelter created');
        this.router.navigateByUrl('/');
      } catch (error: any) {
        console.error('Error registering shelter:', error);
        // Display error message
        alert(error);
      }
    }
  }

  registerShelter(): ShelterModel {
    const newShelter: ShelterModel = {
      name: this.name,
      email: this.email,
      password: this.password,
      address: this.address,
      postal_code: this.postal_code,
      city: this.city,
      token: '',
    };
    return newShelter;
  }

  invalidInput(): boolean {
    if (this.email === '' || this.name === '' || this.password === '') {
      console.log('Please fill out all fields');
      alert('Please fill out all fields');
      return true;
    } else if (this.password !== this.confirmPassword) {
      console.log('Passwords do not match');
      alert('Passwords do not match');
      return true;
    } else {
      return false;
    }
  }
}
