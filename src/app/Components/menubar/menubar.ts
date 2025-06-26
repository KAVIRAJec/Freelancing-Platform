import { NgIf, NgClass, NgOptimizedImage } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { AuthenticationService } from '../../Services/auth.service';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-menubar',
  imports: [NgClass, RouterLink, NgOptimizedImage],
  templateUrl: './menubar.html',
  styleUrl: './menubar.css'
})
export class Menubar implements OnInit {
  showMobileMenu = false;
  authenticated = signal<boolean>(false);
  authRole = signal<'freelancer' | 'client' | null>(null);

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      if(isAuthenticated || sessionStorage.getItem('accessToken')) {
        this.authService.getMe().subscribe({
          next: (response) => {
            if (response.success) {
              this.authRole.set(('hourlyRate' in response.data) ? 'freelancer' : 'client');
              this.authenticated.set(true);
            } else {
              this.authRole.set(null);
              this.authenticated.set(false);
            }
          },
          error: () => {
            this.authRole.set(null);
            this.authenticated.set(false);
          }
        });
      } else {
        this.authenticated.set(false);
        this.authRole.set(null);
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