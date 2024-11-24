import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormsModule, NgForm } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { UserModel } from '../../models/UserModel';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, MatSelectModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements AfterViewInit {
  @ViewChild('passwordInput') passwordInput!: ElementRef;
  @ViewChild('confirmPasswordInput') confirmPasswordInput!: ElementRef;
  @ViewChild('handL') handL!: ElementRef;
  @ViewChild('handR') handR!: ElementRef;
  @ViewChild('registerForm') registerForm!: NgForm;

  filterOptions: string[] = [
    'good with children',
    'aggressive',
    'good with other pets',
    'lazy',
    'friendly',
    'playful',
    'active',
    'energetic',
    'dog',
    'cat',
    'other animal',
  ];

  selectedFilters: string[] = [];
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage!: string;

  constructor(
    private router: Router,
    private registerService: RegisterService
  ) {}

  ngAfterViewInit() {
    document.addEventListener('click', (e: MouseEvent) => {
      const clickedElem = e.target as HTMLElement;
      if (
        clickedElem !== this.passwordInput.nativeElement &&
        clickedElem !== this.confirmPasswordInput.nativeElement
      ) {
        this.normalHandStyle();
      }
    });
  }

  normalHandStyle() {
    this.handL.nativeElement.style.cssText =
      'height: 2.81em; top: 8.4em; left: 7.5em; transform: rotate(0deg);';
    this.handR.nativeElement.style.cssText =
      'height: 2.81em; top: 8.4em; right: 7.5em; transform: rotate(0deg);';
  }

  onPasswordFocus() {
    if (this.passwordInput || this.confirmPasswordInput) {
      this.handL.nativeElement.style.cssText =
        'height: 6.56em; top: 3.87em; left: 11.75em; transform: rotate(-155deg);';
      this.handR.nativeElement.style.cssText =
        'height: 6.56em; top: 3.87em; right: 11.75em; transform: rotate(155deg);';
    }
  }

  async register(form: NgForm) {
    if (form.invalid || this.invalidInput()) {
      console.log('Invalid input');
      return;
    } else {
      console.log(
        `Registering user ${this.email}, ${this.username}, ${this.password}`
      );
      const user = this.registerUser();
      try {
        await this.registerService.createUser(user);
        console.log('User created');
        this.router.navigateByUrl('/');
      } catch (error: any) {
        console.error('Error registering user:', error);
        // Display error message to the user
        this.errorMessage = error.message;
        alert(error.message);
      }
    }
  }

  registerUser(): UserModel {
    const user: UserModel = {
      username: this.username,
      email: this.email,
      password: this.password,
      preferences: this.selectedFilters,
      token: '',
    };
    return user;
  }

  invalidInput(): boolean {
    if (this.email === '' || this.username === '' || this.password === '') {
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
