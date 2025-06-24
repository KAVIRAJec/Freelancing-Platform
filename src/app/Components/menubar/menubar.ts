import { NgIf, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../Services/auth.service';
import { AuthenticationModel } from '../../Models/Authentication.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menubar',
  imports: [NgIf, NgClass, RouterLink],
  templateUrl: './menubar.html',
  styleUrl: './menubar.css'
})
export class Menubar implements OnInit {
  showMobileMenu = false;
  authDetails: AuthenticationModel | null = null;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      this.authDetails = isAuthenticated;
    });
  }

  toggleMobileMenu() {
    this.showMobileMenu = !this.showMobileMenu;
  }
}