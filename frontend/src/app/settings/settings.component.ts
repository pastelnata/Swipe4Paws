import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  // Form data for settings page
  settings = {
    name: '',
    password: '',
    theme: 'light',
    notifications: true,
  };
  private apiUrl = 'http://localhost:3000/users';
  constructor(private http: HttpClient, private auth: AuthService) {}

  userid: number = 0;


  ngOnInit(): void {
    this.auth.getId().subscribe(
      (id) => {
        this.userid = id;
        console.log(`Loaded userid ${this.userid}`);
    })
  }

    updateUser(userId: number, username: string, password: string): Observable<string> {
      console.log(`Logging in user: ${username}`);
      return this.http.post<string>(`${this.apiUrl}/update`, { userId, username, password });
    }
  // Handle form submit
  onSubmit(){
    this.updateUser(this.userid, this.settings.name, this.settings.password).subscribe(
      (response)=>{
        console.log(response);
        this.settings.name = '';
        this.settings.password = '';
      }
    )
  }
}
