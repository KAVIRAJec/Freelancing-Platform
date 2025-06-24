import { Routes } from '@angular/router';
import { Home } from './Components/home/home';
import { Auth } from './Components/auth/auth';

export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: Home},
    {path: 'auth', component: Auth},
    // {path: 'profile', component: Profile, canActivate: [AuthGuard]},
];
