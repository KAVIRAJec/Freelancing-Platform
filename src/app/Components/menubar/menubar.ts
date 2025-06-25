import { NgIf, NgClass, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../Services/auth.service';
import { AuthenticationModel } from '../../Models/Authentication.model';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-menubar',
  imports: [NgIf, NgClass, RouterLink, NgOptimizedImage],
  templateUrl: './menubar.html',
  styleUrl: './menubar.css'
})
export class Menubar implements OnInit {
  showMobileMenu = false;
  authDetails: AuthenticationModel | null = null;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      if(!isAuthenticated && sessionStorage.getItem('authToken')) {
        this.authService.getMe().subscribe({
          next: (response) => {
            if (response.success) {
              const authModel = new AuthenticationModel();
              authModel.email = response.data.email;
              authModel.role = ('hourlyRate' in response.data) ? 'freelancer' : 'client';
              this.authDetails = authModel;
            } else {
              this.authDetails = null;
            }
          },
          error: () => {
            this.authDetails = null;
          }
        });
      } else {
        this.authDetails = isAuthenticated;
      }
    });
  }

  toggleMobileMenu() {
    this.showMobileMenu = !this.showMobileMenu;
  }

  navigateWithSearch(target: 'findexpert' | 'findwork', search: string) {
    this.router.navigate([`/${target}`], { queryParams: { search } });
    this.showMobileMenu = false;
  }
}