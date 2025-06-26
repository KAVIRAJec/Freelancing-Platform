import { NgIf, NgClass, NgOptimizedImage } from '@angular/common';
import { Component, OnInit, signal, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../../Services/auth.service';
import { RouterLink, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClientModel } from '../../Models/Client.model';
import { FreelancerModel } from '../../Models/Freelancer.model';

@Component({
  selector: 'app-menubar',
  imports: [NgClass, RouterLink, NgOptimizedImage],
  templateUrl: './menubar.html',
  styleUrl: './menubar.css'
})
export class Menubar implements OnInit, OnDestroy {
  showMobileMenu = false;
  authenticated = signal<boolean>(false);
  authRole = signal<'freelancer' | 'client' | null>(null);
  private userSub: Subscription | undefined;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.userSub = this.authService.user$.subscribe((user: ClientModel | FreelancerModel | null) => {
      if (user && 'companyName' in user) {
        this.authRole.set('client');
        this.authenticated.set(true);
      } else if (user && 'hourlyRate' in user) {
        this.authRole.set('freelancer');
        this.authenticated.set(true);
      } else {
        this.authRole.set(null);
        this.authenticated.set(false);
      }
    });
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }

  toggleMobileMenu() {
    this.showMobileMenu = !this.showMobileMenu;
  }

  navigateWithSearch(target: 'findexpert' | 'findwork', search: string) {
    this.router.navigate([`/${target}`], { queryParams: { search } });
    this.showMobileMenu = false;
  }
}