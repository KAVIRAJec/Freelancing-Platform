import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CreateClientModel } from '../../Models/Client.model';
import { CreateFreelancerModel } from '../../Models/Freelancer.model';
import { AuthenticationService } from '../../Services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { registerUserByRole } from './auth.store';

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './auth.html',
  styleUrl: './auth.css'
})
export class Auth {
  isFlipped = false;
  loginForm: FormGroup;
  registerForm: FormGroup;
  role: 'client' | 'freelancer' = 'client';
  store = inject(Store);

  constructor(private fb: FormBuilder, private AuthService: AuthenticationService, private toastr: ToastrService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.registerForm = this.createRegisterForm('client');
  }

  flipCard(event: Event) {
    event.preventDefault();
    this.isFlipped = !this.isFlipped;
  }

  onLogin() {
    if (this.loginForm.valid) {
      console.log('Login:', this.loginForm.value);
      this.AuthService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
        next: (response) => {
          console.log('Login successful:', response.message);
          this.toastr.success('Login successful!', 'Success');
          // Redirect to the dashboard or home page
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Login failed:', error);
          // Extract the first validation error message from the error object
          let errorMessage = 'Login failed. Please try again.';
          if (error?.errors && typeof error.errors === 'object') {
            const firstKey = Object.keys(error.errors)[0];
            if (firstKey && Array.isArray(error.errors[firstKey]) && error.errors[firstKey].length > 0) {
              errorMessage = error.errors[firstKey][0];
            }
          }
          this.toastr.error(errorMessage, 'Error');
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
    this.registerForm.reset();
  }

  onRoleChange(role: 'client' | 'freelancer') {
    this.role = role;
    this.registerForm = this.createRegisterForm(role);
  }

  onRegister() {
    if (this.registerForm.valid) {
      const data = this.registerForm.value;
      registerUserByRole(this.store, this.role, data);
      this.toastr.success('Registration submitted!', 'Success');
    } else {
      this.registerForm.markAllAsTouched();
    }
    this.loginForm.reset();
  }

  createRegisterForm(role: 'client' | 'freelancer'): FormGroup {
    if (role === 'client') {
      return this.fb.group({
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        companyName: [''],
        location: [''],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        role: ['client']
      }, { validators: this.passwordMatchValidator });
    } else { //company & skills are not included in the freelancer form
      return this.fb.group({
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        experienceYears: ['', [Validators.required, Validators.min(0)]],
        hourlyRate: ['', [Validators.required, Validators.min(0)]],
        location: [''],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        role: ['freelancer']
      }, { validators: this.passwordMatchValidator });
    }
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
  get regUsername() { return this.registerForm.get('username'); }
  get regEmail() { return this.registerForm.get('email'); }
  get regPassword() { return this.registerForm.get('password'); }
  get regConfirmPassword() { return this.registerForm.get('confirmPassword'); }
  get regCompanyName() { return this.registerForm.get('companyName'); }
  get regLocation() { return this.registerForm.get('location'); }
  get regExperienceYears() { return this.registerForm.get('experienceYears'); }
  get regHourlyRate() { return this.registerForm.get('hourlyRate'); }
  get regRole() { return this.registerForm.get('role'); }
}
