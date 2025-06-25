import { Routes } from '@angular/router';
import { Home } from './Components/home/home';
import { Auth } from './Components/auth/auth';
import { AuthGuard } from './Components/authguard-guard';
import { Profile } from './Components/profile/profile';
import { Chat } from './Components/chat/chat';
import { FindExpert } from './Components/find-expert/find-expert';
import { FindWork } from './Components/find-work/find-work';

export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: Home},
    {path: 'auth', component: Auth},
    {path: 'profile', component: Profile, canActivate: [AuthGuard]},
    {path: 'chat', component: Chat, canActivate: [AuthGuard]},

    {path: 'findexpert', component: FindExpert},
    {path: 'findwork', component: FindWork},

    // {path: 'profile', component: Profile, canActivate: [AuthGuard]},
];
