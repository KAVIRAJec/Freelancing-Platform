import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Menubar } from "./Components/menubar/menubar";
import { AuthenticationService } from './Services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Menubar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  ngOnInit(): void {
    this.tryAutoLogin();
  }
  
  constructor(private authService: AuthenticationService) {}
  protected title = 'Freelancing Project';
  
  tryAutoLogin() {
    const accessToken = sessionStorage.getItem('accessToken');
    if (accessToken) {
      console.log('Access token found, trying to get user information.');
      this.authService.getMe().subscribe({
        next: (response) => {
          console.log('User information restored successfully');
        },
        error: (err) => {
          console.error('Failed to fetch user information:', err);
          this.authService.logout();
        }
      });
    }
  }
}