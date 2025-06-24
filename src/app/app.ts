import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Menubar } from "./Components/menubar/menubar";
import { AuthenticationService } from './Services/auth.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Menubar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{

  ngOnInit(): void {
    this.tryAutoLogin();
  }

  protected title = 'Freelancing Project';
  constructor(private authService: AuthenticationService, private store: Store, private router: Router) {
  }
  
  tryAutoLogin() {
  const accessToken = sessionStorage.getItem('authToken');
  if (!accessToken) {
    console.log('No access token found, redirecting to login.');
    this.authService.refreshToken().subscribe({
      next: (response) => {
        if (response.success) {
          sessionStorage.setItem('authToken', response.data.token);
        } else {
          this.logout();
        }
      },
      error: () => {
        this.logout();
      }
    });
  }
}

logout() {
  sessionStorage.removeItem('authToken');
}
}
