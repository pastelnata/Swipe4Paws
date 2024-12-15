import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  // Form data for settings page
  settings = {
    name: '',
    email: '',
    theme: 'light',
    notifications: true,
  };

  constructor() {}

  ngOnInit(): void {}

  // Handle form submit
  onSubmit() {
    console.log('Settings Updated:', this.settings);
    // Here you can implement logic to save the settings, for example, by making an API call
  }
}

